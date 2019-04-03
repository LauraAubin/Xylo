import * as React from "react";

import autobind from "autobind-decorator";
import PasswordCreation from "./components/PasswordCreation";
import PasswordRecall from "./components/PasswordRecall";
import LogFile from "../LogFile";

import { Card, Frame, ProgressBar, Toast } from "@shopify/polaris";
import { flow } from "./flow";

import "./PssswordWalkthrough.scss";

const PASSWORD_OPTIONS = 12;
const PASSWORD_LENGTH = 6;
const NUMBER_OF_PASSWORDS = 3;

const SHUFFLED_SEQUENCE = [1, 2, 0];

const PASSWORD_TYPES = [
  { type: "Shopping", color: "blue", icon: "products" },
  { type: "Home", color: "teal", icon: "home" },
  { type: "Phone", color: "red", icon: "notification" }
];

interface Props {
  uid: string;
}

interface State {
  showModal: boolean;
  createdPasswords: number[][];
  step: number;
  logCurrentStep: string;
  showToast: boolean;
  toastError: boolean;
  toastContent: string;
}

export default class PasswordWalkthrough extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showModal: false,
      createdPasswords: [],
      step: 0,
      logCurrentStep: "",
      showToast: false,
      toastError: false,
      toastContent: ""
    };
  }

  componentDidMount() {
    this.setState({ createdPasswords: this.createThreePasswords() });
  }

  public render() {
    const { uid } = this.props;

    const {
      showModal,
      createdPasswords,
      step,
      logCurrentStep,
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
                passwordStackElements={PASSWORD_TYPES}
                showToast={this.showToast}
                logCurrentStep={this.logCurrentStep}
              />
            )}
            {!isCreatingPassword && (
              <PasswordRecall
                showModal={showModal}
                passwordOptions={PASSWORD_OPTIONS}
                password={data}
                step={step}
                createElements={this.createShuffledPasswordTypes}
                closeModal={this.closeModal}
                handleModal={this.handleModal}
                showToast={this.showToast}
              />
            )}
          </div>
        </Card>
      );

      const totalSteps = flow(
        [],
        []
      ).length;

      const progressionPercentage = this.calculatePercentage(step, totalSteps);

      return (
        <Frame>
          <div className="CenterElement">
            {passwordMarkup}
            <div className="ProgressBarContainer">
              <div className="ProgressText">Progress</div>
              <ProgressBar
                progress={this.dropDecimals(progressionPercentage)}
              />
            </div>
          </div>
          {showToast && (
            <Toast
              content={toastContent}
              error={toastError}
              onDismiss={this.toggleToast}
            />
          )}
          <LogFile newEntry={logCurrentStep} uid={uid} />
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

  private createShuffledPasswordTypes() {
    return SHUFFLED_SEQUENCE.map(i => PASSWORD_TYPES[i]);
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

  private calculatePercentage(current: number, total: number) {
    return (current / total) * 100;
  }

  private dropDecimals(number: number) {
    return Math.trunc(number);
  }

  @autobind
  private logCurrentStep(event: string) {
    this.setState({ logCurrentStep: event });
  }
}
