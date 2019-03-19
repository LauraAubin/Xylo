import * as React from "react";

import { Button, Card, Modal } from "@shopify/polaris";

import XylophoneContainer from "../XylophoneContainer";

import "./PssswordWalkthrough.scss";

const PASSWORD_OPTIONS = 12;
const PASSWORD_LENGTH = 6;

interface State {
  passwordCreationModal: boolean;
  createdPasswords: { first: number[]; second: number[]; third: number[] };
}

export default class PasswordWalkthrough extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      passwordCreationModal: false,
      createdPasswords: { first: [], second: [], third: [] }
    };
  }

  componentDidMount() {
    this.setState({
      createdPasswords: {
        first: this.generatePassword(),
        second: this.generatePassword(),
        third: this.generatePassword()
      }
    });
  }

  handlePasswordCreationModal = () => {
    const { passwordCreationModal } = this.state;

    this.setState({ passwordCreationModal: !passwordCreationModal });
  };

  public render() {
    const { passwordCreationModal, createdPasswords } = this.state;

    const passwordCreationModalMarkup = (
      <Modal
        large
        title="Try to remember the following password"
        open={passwordCreationModal}
        onClose={this.handlePasswordCreationModal}
        primaryAction={{
          content: "Got it",
          onAction: this.handlePasswordCreationModal
        }}
      >
        <Modal.Section>
          <XylophoneContainer
            numberOfKeys={PASSWORD_OPTIONS}
            generatedPassword={createdPasswords.first}
          />
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

  private generatePassword() {
    return Array.from({ length: PASSWORD_LENGTH }, () =>
      Math.ceil(Math.random() * PASSWORD_OPTIONS)
    );
  }
}
