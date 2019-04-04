import * as React from "react";

import autobind from "autobind-decorator";
import PasswordStack from "../components/PasswordStack";
import XylophoneContainer from "../../../XylophoneContainer";

import { Button, Modal, Tooltip } from "@shopify/polaris";

import "./PasswordCreation.scss";

enum Type {
  creation,
  recall
}

interface Props {
  showModal: boolean;
  passwordOptions: number;
  password: number[];
  step: number;
  passwordStackElements: { type: string; color: string; icon: string }[];
  closeModal(): void;
  handleModal(): void;
  showToast(toastContent: string, toastError: boolean): void;
  logCurrentStep(event: string): void;
}

interface State {
  practiceMode: boolean;
  visualizationMode: boolean;
  hasCompletedPracticeMode: boolean;
}

export default class PasswordCreation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      practiceMode: false,
      visualizationMode: false,
      hasCompletedPracticeMode: false
    };
  }

  componentDidUpdate() {
    const { showModal } = this.props;
    const { practiceMode } = this.state;

    const modalClosedWhilePracticeModeIsActive = !showModal && practiceMode;
    if (modalClosedWhilePracticeModeIsActive) {
      this.stopPracticing();
    }
  }

  public render() {
    const {
      showModal,
      passwordOptions,
      password,
      step,
      passwordStackElements,
      handleModal,
      showToast,
      logCurrentStep
    } = this.props;

    const {
      practiceMode,
      visualizationMode,
      hasCompletedPracticeMode
    } = this.state;

    const modalFooter = (
      <div className="ModalFooterArea">
        <div className="PracticeButton">
          <Tooltip content="Try to follow along with the displayed password">
            <Button
              disabled={practiceMode || visualizationMode}
              onClick={this.practiceClicked}
            >
              Practice
            </Button>
          </Tooltip>
        </div>
        <Tooltip content="Complete the practice event before moving forward">
          <Button
            primary
            disabled={
              practiceMode || visualizationMode || !hasCompletedPracticeMode
            }
            onClick={this.closeModal}
          >
            Got it
          </Button>
        </Tooltip>
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
            password={password}
            practiceMode={practiceMode}
            hasCompletedPracticeMode={this.hasCompletedPracticeMode}
            stopPracticing={this.stopPracticing}
            showToast={showToast}
            logCurrentStep={logCurrentStep}
            visualizationMode={visualizationMode}
            toggleVisualizationMode={this.toggleVisualizationMode}
          />
        </Modal.Section>
      </Modal>
    );

    return (
      <>
        <PasswordStack
          step={step}
          elements={passwordStackElements}
          buttonText="Create password"
          onClick={this.handleCreatePasswordButton}
        />
        {modalMarkup}
      </>
    );
  }

  @autobind
  private handleCreatePasswordButton() {
    const { handleModal, logCurrentStep } = this.props;

    handleModal();
    this.resetPracticeMode();
    logCurrentStep("start_creating_password");
  }

  @autobind
  private practiceClicked() {
    const { logCurrentStep } = this.props;

    this.setState({ practiceMode: true });
    logCurrentStep("start_practice");
  }

  @autobind
  private closeModal() {
    const { closeModal, logCurrentStep } = this.props;

    closeModal();
    logCurrentStep("finish_creating_password");
  }

  @autobind
  private stopPracticing() {
    this.setState({ practiceMode: false });
  }

  @autobind
  private hasCompletedPracticeMode() {
    this.setState({ hasCompletedPracticeMode: true });
  }

  @autobind
  private resetPracticeMode() {
    this.setState({ hasCompletedPracticeMode: false });
  }

  @autobind toggleVisualizationMode() {
    const { visualizationMode } = this.state;

    this.setState({ visualizationMode: !visualizationMode });
  }
}
