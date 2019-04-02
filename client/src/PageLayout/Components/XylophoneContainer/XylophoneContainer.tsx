import * as React from "react";

import { Button } from "@shopify/polaris";
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
  recallMode?: boolean;
  stopPracticing?(): void;
  badAttempt?(): void;
  showToast(toastContent: string, toastError: boolean): void;
}

interface State {
  repeatPasswordVisualization: number;
  pressedKey?: number;
  keysPressed: number[];
  showToast: boolean;
}

export default class XylophoneContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      repeatPasswordVisualization: 0,
      pressedKey: undefined,
      keysPressed: [],
      showToast: false
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
      recallMode
    } = this.props;
    const { pressedKey, repeatPasswordVisualization } = this.state;

    return (
      <div className="Center ContainerHeight">
        <Xylophone
          numberOfKeys={numberOfKeys}
          generatedPassword={password}
          repeatPasswordVisualization={repeatPasswordVisualization}
          practiceMode={practiceMode}
          recallMode={recallMode}
          pressedKey={pressedKey}
          singlePressedKey={this.singlePressedKey}
          addNewPressedKey={this.addNewPressedKey}
        />
        {type === Type.creation && (
          <Button
            plain
            disabled={practiceMode}
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
    const { repeatPasswordVisualization } = this.state;

    this.setState({
      repeatPasswordVisualization: repeatPasswordVisualization + 1
    });
  }

  @autobind
  private singlePressedKey(key: number) {
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
    const { password, showToast, badAttempt } = this.props;
    const { keysPressed } = this.state;

    const fullPasswordLengthExplored = keysPressed.length === password.length;

    if (fullPasswordLengthExplored) {
      if (isEqual(keysPressed, password)) {
        showToast && showToast("Correct!", false);
      } else {
        showToast && showToast("Whoops, not quite right", true);
        badAttempt && badAttempt();
      }

      this.clearKeysPressed();
      return true;
    }
  }
}
