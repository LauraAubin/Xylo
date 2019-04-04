import * as React from "react";

import { Button } from "@shopify/polaris";
import { emptyArray } from "../../../Utilities/Utilities";
import { isEqual } from "lodash";

import autobind from "autobind-decorator";
import Xylophone from "./components/Xylophone";

import "./XylophoneContainer.scss";

enum Type {
  creation,
  recall
}

interface Props {
  type: Type.creation | Type.recall;
  numberOfKeys: number;
  password: number[];
  practiceMode?: boolean;
  hasCompletedPracticeMode?(): void;
  recallMode?: boolean;
  stopPracticing?(): void;
  correctAttempt?(): void;
  badAttempt?(): void;
  visualizationMode?: boolean;
  showToast(toastContent: string, toastError: boolean): void;
  logCurrentStep(event: string): void;
  toggleVisualizationMode?(): void;
}

interface State {
  repeatPasswordVisualization: number;
  pressedKey?: number;
  keysPressed: number[];
  showToast: boolean;
  stopAnimationCycle: number;
}

export default class XylophoneContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      repeatPasswordVisualization: 0,
      pressedKey: undefined,
      keysPressed: [],
      showToast: false,
      stopAnimationCycle: 0
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { practiceMode } = this.props;

    const practiceModeActivated =
      prevProps.practiceMode !== practiceMode && practiceMode;

    if (practiceModeActivated) {
      this.visualizePassword();
    }
  }

  public render() {
    const {
      numberOfKeys,
      password,
      type,
      practiceMode,
      recallMode,
      visualizationMode,
      toggleVisualizationMode
    } = this.props;
    const {
      pressedKey,
      repeatPasswordVisualization,
      stopAnimationCycle
    } = this.state;

    return (
      <div className="Center ContainerHeight">
        <Xylophone
          numberOfKeys={numberOfKeys}
          generatedPassword={password}
          repeatPasswordVisualization={repeatPasswordVisualization}
          practiceMode={practiceMode}
          recallMode={recallMode}
          pressedKey={pressedKey}
          stopAnimationCycle={stopAnimationCycle}
          singlePressedKey={this.singlePressedKey}
          addNewPressedKey={this.addNewPressedKey}
          toggleVisualizationMode={toggleVisualizationMode}
        />
        {type === Type.creation && (
          <Button
            plain
            disabled={practiceMode || visualizationMode}
            onClick={this.visualizePassword}
          >
            Play password
          </Button>
        )}
        {type === Type.recall && (
          <Button plain disabled={!pressedKey} onClick={this.confirmPressedKey}>
            Confirm this key
          </Button>
        )}
      </div>
    );
  }

  @autobind
  private visualizePassword() {
    const { toggleVisualizationMode } = this.props;
    const { repeatPasswordVisualization } = this.state;

    toggleVisualizationMode && toggleVisualizationMode();

    this.setState({
      repeatPasswordVisualization: repeatPasswordVisualization + 1
    });
  }

  @autobind
  private singlePressedKey(key: number) {
    this.logStartPasswordEntry();
    this.setState({ pressedKey: key });
  }

  @autobind
  private addNewPressedKey(key: number) {
    const { practiceMode, stopPracticing } = this.props;

    if (practiceMode) {
      this.addAnotherKey(key);
      this.evaluateExploredPassword() && stopPracticing && stopPracticing();
    }
  }

  private addAnotherKey(key: number) {
    const { keysPressed } = this.state;

    keysPressed.push(key);
    this.setState({ keysPressed });
  }

  @autobind
  private confirmPressedKey() {
    const { pressedKey } = this.state;

    pressedKey && this.addAnotherKey(pressedKey);
    this.evaluateExploredPassword();
    this.clearPressedKey();
  }

  private clearPressedKey() {
    this.setState({ pressedKey: undefined });
  }

  private clearKeysPressed() {
    this.setState({ keysPressed: [] });
  }

  private evaluateExploredPassword() {
    const { password } = this.props;
    const { keysPressed, stopAnimationCycle } = this.state;

    const fullPasswordLengthExplored = keysPressed.length === password.length;

    if (fullPasswordLengthExplored) {
      this.setState({ stopAnimationCycle: stopAnimationCycle + 1 });

      if (isEqual(keysPressed, password)) {
        this.correctEntry();
      } else {
        this.badEntry();
      }

      this.clearKeysPressed();
      return true;
    }
  }

  private correctEntry() {
    const { showToast, correctAttempt, practiceMode } = this.props;

    showToast && showToast("Correct!", false);
    correctAttempt && correctAttempt();
    practiceMode && this.logGoodPractice();
  }

  private badEntry() {
    const { showToast, badAttempt, practiceMode } = this.props;

    showToast && showToast("Whoops, not quite right", true);
    badAttempt && badAttempt();
    practiceMode && this.logFailedPractice();
  }

  private logGoodPractice() {
    const { logCurrentStep, hasCompletedPracticeMode } = this.props;

    hasCompletedPracticeMode && hasCompletedPracticeMode();
    logCurrentStep && logCurrentStep("finish_practice_successful");
  }

  private logFailedPractice() {
    const { logCurrentStep } = this.props;

    logCurrentStep && logCurrentStep("finish_practice_failed");
  }

  @autobind
  private logStartPasswordEntry() {
    const { recallMode, logCurrentStep } = this.props;
    const { keysPressed } = this.state;

    const initialKeyEntry = emptyArray(keysPressed);

    if (recallMode && initialKeyEntry) {
      logCurrentStep && logCurrentStep("start_password_entry");
    }
  }
}
