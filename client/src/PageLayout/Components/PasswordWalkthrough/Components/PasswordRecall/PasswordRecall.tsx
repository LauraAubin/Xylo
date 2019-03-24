import * as React from 'react';

import XylophoneContainer from "../../../XylophoneContainer";

import { Button, Modal } from "@shopify/polaris";

enum Type {
  creation,
  recall
}

interface Props {
  showModal: boolean;
  passwordOptions: number;
  password: number[];
  closeModal(): void;
  handleModal(): void;
}

export default class PasswordRecall extends React.Component<Props> {
  public render() {
    const {
      showModal,
      passwordOptions,
      password,
      closeModal,
      handleModal
    } = this.props;

    const modalMarkup = (
      <Modal
        large
        title="Try to recall the password for x"
        open={showModal}
        onClose={closeModal}
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
        <Button onClick={handleModal}>Remember password</Button>
        {modalMarkup}
      </>
    );
  }
}
