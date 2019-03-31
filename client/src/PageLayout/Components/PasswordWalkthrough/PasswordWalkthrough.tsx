import * as React from "react";

import autobind from "autobind-decorator";
import PasswordCreation from "./components/PasswordCreation";
import PasswordRecall from "./components/PasswordRecall";

import { Card, Frame, Toast } from "@shopify/polaris";
import { emptyArray } from "../../../Utilities/Utilities";
import { flow } from "./flow";

import "./PssswordWalkthrough.scss";

const PASSWORD_OPTIONS = 12;
const PASSWORD_LENGTH = 6;
const NUMBER_OF_PASSWORDS = 3;

const SHUFFLED_SEQUENCE = [1, 2, 0];

interface State {
  showModal: boolean;
  createdPasswords: number[][];
  step: number;
  showToast: boolean;
  toastError: boolean;
  toastContent: string;
}

export default class PasswordWalkthrough extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      showModal: false,
      createdPasswords: [],
      step: 0,
      showToast: false,
      toastError: false,
      toastContent: ""
    };
  }

  componentDidMount() {
    this.setState({ createdPasswords: this.createThreePasswords() });
  }

  public render() {
    const {
      showModal,
      createdPasswords,
      step,
      showToast,
      toastError,
      toastContent
    } = this.state;

    const flowSteps = flow(
      createdPasswords,
      SHUFFLED_SEQUENCE
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
                showToast={this.showToast}
              />
            )}
            {!isCreatingPassword && (
              <PasswordRecall
                showModal={showModal}
                passwordOptions={PASSWORD_OPTIONS}
                password={data}
                step={step}
                closeModal={this.closeModal}
                handleModal={this.handleModal}
              />
            )}
          </div>
        </Card>
      );

      return (
        <Frame>
          <div className="CenterElement">{passwordMarkup}</div>
          {showToast && (
            <Toast
              content={toastContent}
              error={toastError}
              onDismiss={this.toggleToast}
            />
          )}
        </Frame>
      );
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

  @autobind
  private toggleToast() {
    const { showToast } = this.state;

    this.setState({ showToast: !showToast });
  }

  @autobind
  private showToast(toastContent: string, toastError: boolean) {
    this.setState({ toastContent, toastError });
    this.toggleToast();
  }
}
