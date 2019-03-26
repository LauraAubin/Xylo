import * as React from "react";

import autobind from "autobind-decorator";
import XylophoneContainer from "../../../XylophoneContainer";

import { Button, Icon, Modal, Stack, TextStyle } from "@shopify/polaris";

import "./PasswordCreation.scss";

enum Type {
  creation,
  recall
}

interface Props {
  showModal: boolean;
  passwordOptions: number;
  generatedPassword: number[];
  step: number;
  closeModal(): void;
  handleModal(): void;
}

interface State {
  practiceMode: boolean;
}

export default class PasswordCreation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { practiceMode: false };
  }

  public render() {
    const {
      showModal,
      passwordOptions,
      generatedPassword,
      step,
      closeModal,
      handleModal
    } = this.props;

    const { practiceMode } = this.state;

    const modalFooter = (
      <div className="ModalFooterArea">
        <div className="PracticeButton">
          <Button onClick={this.practiceClicked}>Practice</Button>
        </div>
        <Button primary onClick={closeModal}>
          Got it
        </Button>
      </div>
    );

    const modalMarkup = (
      <Modal
        large
        title="Try to remember the following password"
        open={showModal}
        onClose={handleModal}
        footer={modalFooter}
      >
        <Modal.Section>
          <XylophoneContainer
            type={Type.creation}
            numberOfKeys={passwordOptions}
            password={generatedPassword}
            practiceMode={practiceMode}
          />
        </Modal.Section>
      </Modal>
    );

    const pageMarkup = [
      { type: "Shopping", color: "blue", icon: "products" },
      { type: "Home", color: "teal", icon: "home" },
      { type: "Phone", color: "red", icon: "notification" }
    ].map((item, index) => (
      <div className="StackElement">
        <Stack alignment="center">
          <Stack.Item>
            <div className={`Circle Circle--${item.color}`}>
              <Icon
                source={
                  item.icon === "products"
                    ? "products"
                    : item.icon === "home"
                    ? "home"
                    : "notification"
                }
                color="white"
              />
            </div>
          </Stack.Item>
          <Stack.Item fill>
            <TextStyle variation="subdued">{item.type}</TextStyle>
          </Stack.Item>
          <Stack.Item>
            {index === step && (
              <ul className={`ArrowButton ArrowButton--${item.color}`}>
                <li>
                  <a onClick={handleModal}>Create password</a>
                </li>
              </ul>
            )}
          </Stack.Item>
        </Stack>
      </div>
    ));

    return (
      <>
        {pageMarkup}
        {modalMarkup}
      </>
    );
  }

  @autobind
  private practiceClicked() {
    this.setState({ practiceMode: true });
  }
}
