import * as React from "react";

import { Button, Modal } from "@shopify/polaris";

interface State {
  passwordCreationModal: boolean;
  createdPasswords: { "type 1": string; "type 2": string; "type 3": string };
}

export default class PasswordWalkthrough extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      passwordCreationModal: false,
      createdPasswords: { "type 1": "", "type 2": "", "type 3": "" }
    };
  }

  handlePasswordCreationModal = () => {
    const { passwordCreationModal } = this.state;

    this.setState({ passwordCreationModal: !passwordCreationModal });
  };

  public render() {
    const { passwordCreationModal } = this.state;

    const passwordCreationModalMarkup = (
      <Modal
        open={passwordCreationModal}
        onClose={this.handlePasswordCreationModal}
        primaryAction={{
          content: "Close",
          onAction: this.handlePasswordCreationModal
        }}
      >
        <Modal.Section>Here you will be assigned a password and get to practice it</Modal.Section>
      </Modal>
    );

    return (
      <>
        <div>
          Here I walk you through creating and remembering your password
        </div>
        <Button onClick={this.handlePasswordCreationModal}>
          Create password
        </Button>
        {passwordCreationModalMarkup}
      </>
    );
  }
}
