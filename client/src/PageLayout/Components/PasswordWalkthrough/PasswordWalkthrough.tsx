import * as React from "react";

import { Button, Card, Modal } from "@shopify/polaris";

import PasswordCreation from "./components/PasswordCreation";

import "./PssswordWalkthrough.scss";

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
        <Modal.Section>
          <PasswordCreation />
        </Modal.Section>
      </Modal>
    );

    return (
      <div className="CenterElement">
        <Card title="Create passwords">
          <div className="CardElements">
            <Button onClick={this.handlePasswordCreationModal}>
              Create password
            </Button>
            {passwordCreationModalMarkup}
          </div>
        </Card>
      </div>
    );
  }
}
