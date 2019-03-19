import * as React from "react";

import autobind from "autobind-decorator";
import PasswordCreation from "./components/PasswordCreation";

import { Card } from "@shopify/polaris";

import "./PssswordWalkthrough.scss";

const PASSWORD_OPTIONS = 12;
const PASSWORD_LENGTH = 6;
const NUMBER_OF_PASSWORDS = 3;

interface State {
  showPasswordCreationModal: boolean;
  createdPasswords: number[][];
  step: number;
}

export default class PasswordWalkthrough extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      showPasswordCreationModal: false,
      createdPasswords: [],
      step: 0
    };
  }

  componentDidMount() {
    this.setState({
      createdPasswords: this.createThreePasswords()
    });
  }

  public render() {
    const { showPasswordCreationModal, createdPasswords, step } = this.state;

    const flow = [
      { action: createdPasswords[0], description: "Show first password" },
      { action: createdPasswords[1], description: "Show second password" },
      { action: createdPasswords[2], description: "Show third password" }
    ];

    return (
      <div className="CenterElement">
        <Card title="Create passwords">
          <div className="CardElements">
            <PasswordCreation
              showPasswordCreationModal={showPasswordCreationModal}
              passwordOptions={PASSWORD_OPTIONS}
              generatedPassword={flow[step].action}
              closeModal={this.closeModal}
              handlePasswordCreationModal={this.handlePasswordCreationModal}
            />
          </div>
        </Card>
      </div>
    );
  }

  private generatePassword() {
    return Array.from({ length: PASSWORD_LENGTH }, () =>
      Math.ceil(Math.random() * PASSWORD_OPTIONS)
    );
  }

  private createThreePasswords() {
    return Array.from({ length: NUMBER_OF_PASSWORDS }, () =>
      this.generatePassword()
    );
  }

  @autobind
  private handlePasswordCreationModal() {
    const { showPasswordCreationModal } = this.state;

    this.setState({ showPasswordCreationModal: !showPasswordCreationModal });
  }

  @autobind
  private closeModal() {
    const { step } = this.state;

    this.setState({ step: step + 1 });
    this.handlePasswordCreationModal();
  }
}
