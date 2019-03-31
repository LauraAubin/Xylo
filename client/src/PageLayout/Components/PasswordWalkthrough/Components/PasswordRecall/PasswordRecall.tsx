import * as React from "react";

import PasswordStack from "../components/PasswordStack";
import XylophoneContainer from "../../../XylophoneContainer";

import { Modal } from "@shopify/polaris";

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
}

export default class PasswordRecall extends React.Component<Props> {
  public render() {
    const {
      showModal,
      passwordOptions,
      password,
      step,
      createElements,
      closeModal,
      handleModal
    } = this.props;

    const modalMarkup = (
      <Modal
        large
        title="Try to recall the password for x"
        open={showModal}
        onClose={handleModal}
        primaryAction={{
          content: "Got it",
          onAction: closeModal
        }}
      >
        <Modal.Section>
          <XylophoneContainer
            type={Type.recall}
            numberOfKeys={passwordOptions}
            password={password}
          />
        </Modal.Section>
      </Modal>
    );

    return (
      <>
        <PasswordStack
          step={step}
          elements={createElements()}
          buttonText="Remember password"
          onClick={handleModal}
        />
        {modalMarkup}
      </>
    );
  }
}
