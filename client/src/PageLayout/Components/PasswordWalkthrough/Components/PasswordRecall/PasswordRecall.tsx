import * as React from "react";

import autobind from "autobind-decorator";
import PasswordStack from "../components/PasswordStack";
import XylophoneContainer from "../../../XylophoneContainer";

import { Modal, TextStyle } from "@shopify/polaris";

enum Type {
  creation,
  recall
}

interface Props {
  showModal: boolean;
  passwordOptions: number;
  password: number[];
  step: number;
  createElements(): { type: string; color: string; icon: string }[];
  closeModal(): void;
  handleModal(): void;
  showToast(toastContent: string, toastError: boolean): void;
  logCurrentStep(event: string): void;
}

interface State {
  attemptsLeft: number;
}

export default class PasswordRecall extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { attemptsLeft: 3 };
  }

  public render() {
    const {
      showModal,
      passwordOptions,
      password,
      step,
      createElements,
      handleModal,
      showToast,
      logCurrentStep,
    } = this.props;

    const { attemptsLeft } = this.state;

    const elements = createElements();
    const elementName = elements[step - 3].type;

    const attemptsTextColor = attemptsLeft === 1 ? "negative" : "subdued";

    const footerMarkup = (
      <div>
        Attempts left:&nbsp;
        <TextStyle variation={attemptsTextColor}>{attemptsLeft}</TextStyle>
      </div>
    );

    const modalMarkup = (
      <Modal
        large
        title={`Try to remember the password for ${elementName.toLowerCase()}`}
        open={showModal}
        onClose={handleModal}
        footer={footerMarkup}
      >
        <Modal.Section>
          <XylophoneContainer
            type={Type.recall}
            numberOfKeys={passwordOptions}
            password={password}
            showToast={showToast}
            correctAttempt={this.correctAttempt}
            badAttempt={this.badAttempt}
            logCurrentStep={logCurrentStep}
            recallMode
          />
        </Modal.Section>
      </Modal>
    );

    return (
      <>
        <PasswordStack
          step={step}
          elements={elements}
          buttonText="Remember password"
          onClick={handleModal}
        />
        {modalMarkup}
      </>
    );
  }

  @autobind
  private correctAttempt() {
    const { logCurrentStep } = this.props;

    this.endTurn();
    logCurrentStep && logCurrentStep("finish_password_entry_successful");
  }

  @autobind
  private badAttempt() {
    const { logCurrentStep } = this.props;
    const { attemptsLeft } = this.state;

    if (attemptsLeft === 1) {
      this.resetAttempts();
      this.endTurn();
    } else {
      this.setState({ attemptsLeft: attemptsLeft - 1 });
    }

    logCurrentStep && logCurrentStep("finish_password_entry_failed");
  }

  private endTurn() {
    const { closeModal } = this.props;

    this.resetAttempts();
    closeModal();
  }

  private resetAttempts() {
    this.setState({ attemptsLeft: 3 });
  }
}
