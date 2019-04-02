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
      showToast
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
            badAttempt={this.badAttempt}
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
  private badAttempt() {
    const { attemptsLeft } = this.state;

    this.setState({ attemptsLeft: attemptsLeft - 1 });
  }
}
