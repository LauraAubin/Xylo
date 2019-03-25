import * as React from "react";

import autobind from "autobind-decorator";
import PasswordCreation from "./components/PasswordCreation";
import PasswordRecall from "./components/PasswordRecall";

import { Card } from "@shopify/polaris";
import { emptyArray } from "../../../Utilities/Utilities";
import { flow } from "./flow";

import "./PssswordWalkthrough.scss";

const PASSWORD_OPTIONS = 12;
const PASSWORD_LENGTH = 6;
const NUMBER_OF_PASSWORDS = 3;

interface State {
  showModal: boolean;
  createdPasswords: number[][];
  shuffledPasswords: number[][];
  step: number;
}

export default class PasswordWalkthrough extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      showModal: false,
      createdPasswords: [],
      shuffledPasswords: [],
      step: 0
    };
  }

  componentDidMount() {
    this.setState({ createdPasswords: this.createThreePasswords() });
  }

  componentDidUpdate() {
    const { createdPasswords, shuffledPasswords } = this.state;

    if (!emptyArray(createdPasswords) && emptyArray(shuffledPasswords)) {
      this.setState({ shuffledPasswords: this.createShuffledPasswords() });
    }
  }

  public render() {
    const { showModal, createdPasswords, shuffledPasswords, step } = this.state;

    const flowSteps = flow(
      createdPasswords,
      shuffledPasswords
    );
    const endOfFlow = step >= flowSteps.length;

    if (endOfFlow) {
      const emptyStateMarkup = (
        <div className="CenterElement">
          <div>Uh oh, something went wrong 🙁</div>
        </div>
      );

      return emptyStateMarkup;
    } else {
      const cardTitle = flowSteps[step].title;
      const data = flowSteps[step].data;
      const isCreatingPassword = flowSteps[step].action.isCreatingPassword;

      const passwordMarkup = (
        <Card title={cardTitle}>
          <div className="CardElements">
            {isCreatingPassword && (
              <PasswordCreation
                showModal={showModal}
                passwordOptions={PASSWORD_OPTIONS}
                generatedPassword={data}
                closeModal={this.closeModal}
                handleModal={this.handleModal}
                step={step}
              />
            )}
            {!isCreatingPassword && (
              <PasswordRecall
                showModal={showModal}
                passwordOptions={PASSWORD_OPTIONS}
                password={data}
                closeModal={this.closeModal}
                handleModal={this.handleModal}
              />
            )}
          </div>
        </Card>
      );

      return <div className="CenterElement">{passwordMarkup}</div>;
    }
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

  private createShuffledPasswords() {
    const { createdPasswords } = this.state;

    return createdPasswords.sort(() => Math.random() - 0.5);
  }

  @autobind
  private handleModal() {
    const { showModal } = this.state;

    this.setState({ showModal: !showModal });
  }

  @autobind
  private closeModal() {
    const { step } = this.state;

    this.setState({ step: step + 1 });
    this.handleModal();
  }
}
