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
      handleModal
    } = this.props;

    const elements = createElements();
    const elementName = elements[step - 3].type;

    const modalMarkup = (
      <Modal
        large
        title={`Try to remember the password for ${elementName.toLowerCase()}`}
        open={showModal}
        onClose={handleModal}
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
          elements={elements}
          buttonText="Remember password"
          onClick={handleModal}
        />
        {modalMarkup}
      </>
    );
  }
}
