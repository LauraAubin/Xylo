import * as React from "react";

import XylophoneContainer from "../../../XylophoneContainer";

import { Button, Modal } from "@shopify/polaris";

enum Type {
  creation,
  recall
}

interface Props {
  showModal: boolean;
  passwordOptions: number;
  generatedPassword: number[];
  closeModal(): void;
  handleModal(): void;
}

export default class PasswordCreation extends React.Component<Props> {
  public render() {
    const {
      showModal,
      passwordOptions,
      generatedPassword,
      closeModal,
      handleModal
    } = this.props;

    const modalMarkup = (
      <Modal
        large
        title="Try to remember the following password"
        open={showModal}
        onClose={handleModal}
        primaryAction={{
          content: "Got it",
          onAction: closeModal
        }}
      >
        <Modal.Section>
          <XylophoneContainer
            type={Type.creation}
            numberOfKeys={passwordOptions}
            password={generatedPassword}
          />
        </Modal.Section>
      </Modal>
    );

    return (
      <>
        <Button onClick={handleModal}>Create password</Button>
        {modalMarkup}
      </>
    );
  }
}
