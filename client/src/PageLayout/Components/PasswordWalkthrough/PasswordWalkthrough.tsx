import * as React from "react";

import autobind from "autobind-decorator";
import PasswordCreation from "./components/PasswordCreation";

import { Card } from "@shopify/polaris";
import { flow } from "./flow";

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

    const flowSteps = flow(createdPasswords);
    const cardTitle = flowSteps[step].title;
    const isCreatingPassword = flowSteps[step].action.isCreatingPassword;

    const endOfFlow = step >= flow.length;

    const creatingPasswordMarkup = (
      <Card title={cardTitle}>
        <div className="CardElements">
          {isCreatingPassword && (
            <PasswordCreation
              showPasswordCreationModal={showPasswordCreationModal}
              passwordOptions={PASSWORD_OPTIONS}
              generatedPassword={flowSteps[step].data}
              closeModal={this.closeModal}
              handlePasswordCreationModal={this.handlePasswordCreationModal}
            />
          )}
        </div>
      </Card>
    );

    const pageMarkup = !endOfFlow && creatingPasswordMarkup;

    const emptyStateMarkup = endOfFlow && (
      <div>Uh oh, something went wrong 🙁</div>
    );

    return (
      <div className="CenterElement">
        {pageMarkup}
        {emptyStateMarkup}
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
