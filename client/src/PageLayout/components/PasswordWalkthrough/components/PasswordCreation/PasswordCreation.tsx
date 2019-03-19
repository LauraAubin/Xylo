import * as React from "react";

import XylophoneContainer from "../../../XylophoneContainer";

import { Button, Modal } from "@shopify/polaris";

interface Props {
  showPasswordCreationModal: boolean;
  passwordOptions: number;
  generatedPassword: number[];
  closeModal(): void;
  handlePasswordCreationModal(): void;
}

export default class PasswordCreation extends React.Component<Props> {
  public render() {
    const {
      showPasswordCreationModal,
      passwordOptions,
      generatedPassword,
      closeModal,
      handlePasswordCreationModal
    } = this.props;

    const passwordCreationModalMarkup = (
      <Modal
        large
        title="Try to remember the following password"
        open={showPasswordCreationModal}
        onClose={closeModal}
        primaryAction={{
          content: "Got it",
          onAction: closeModal
        }}
      >
        <Modal.Section>
          <XylophoneContainer
            numberOfKeys={passwordOptions}
            generatedPassword={generatedPassword}
          />
        </Modal.Section>
      </Modal>
    );

    return (
      <>
        <Button onClick={handlePasswordCreationModal}>Create password</Button>
        {passwordCreationModalMarkup}
      </>
    );
  }
}
