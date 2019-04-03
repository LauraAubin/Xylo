import * as React from "react";

import autobind from "autobind-decorator";
import PasswordCreation from "./components/PasswordCreation";
import PasswordRecall from "./components/PasswordRecall";
import ProgressBar from "./components/components/ProgressBar";
import LogFile from "../LogFile";

import { Card, Frame, Toast } from "@shopify/polaris";
import { flow } from "./flow";

import "./PssswordWalkthrough.scss";
import "./OverwritePolaris.scss";

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

    const toastMarkup = showToast && (
      <Toast
        content={toastContent}
        error={toastError}
        onDismiss={this.toggleToast}
      />
    );

    const endOfFlow = step >= flowSteps.length;

    if (endOfFlow) {
      const EndStateMarkup = (
        <div className="CenterElement">
          <Card title="That's all folks!">
            <div className="EndStateText">Thanks for participating 😃</div>
          </Card>
        </div>
      );

      return (
        <Frame>
          <div className="CenterElement">
            {EndStateMarkup}
            <ProgressBar step={step} text="Completed" />
          </div>
          {toastMarkup}
          <LogFile newEntry={logCurrentStep} uid={uid} />
        </Frame>
      );
    } else {
      const cardTitle = flowSteps[step].title;
      const data = flowSteps[step].data;
      const isCreatingPassword = flowSteps[step].action.isCreatingPassword;

      const defaultPasswordProps = {
        step: step,
        password: data,
        passwordOptions: PASSWORD_OPTIONS,
        showModal: showModal,
        closeModal: this.closeModal,
        handleModal: this.handleModal,
        showToast: this.showToast,
        logCurrentStep: this.logCurrentStep
      };

      const passwordMarkup = (
        <Card title={cardTitle}>
          <div className="CardElements">
            {isCreatingPassword && (
              <PasswordCreation
                passwordStackElements={PASSWORD_TYPES}
                {...defaultPasswordProps}
              />
            )}
            {!isCreatingPassword && (
              <PasswordRecall
                createElements={this.createShuffledPasswordTypes}
                {...defaultPasswordProps}
              />
            )}
          </div>
        </Card>
      );

      return (
        <Frame>
          <div className="CenterElement">
            {passwordMarkup}
            <ProgressBar step={step} />
          </div>
          {toastMarkup}
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

  @autobind
  private logCurrentStep(event: string) {
    this.setState({ logCurrentStep: event });
  }
}
