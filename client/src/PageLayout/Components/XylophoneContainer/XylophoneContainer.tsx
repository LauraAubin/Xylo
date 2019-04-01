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
  showToast?(toastContent: string, toastError: boolean): void;
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

    const practiceModeCancelled =
      prevProps.practiceMode !== practiceMode && !practiceMode;
    if (practiceModeCancelled) {
      this.resetKeysPressed();
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
    const { practiceMode, password, stopPracticing } = this.props;
    const { keysPressed } = this.state;

    if (practiceMode) {
      keysPressed.push(key);

      this.setState({ keysPressed });

      const fullPasswordLengthExplored = keysPressed.length === password.length;
      if (fullPasswordLengthExplored) {
        this.launchToastMessage();
        stopPracticing && stopPracticing();
      }
    }
  }

  private resetKeysPressed() {
    this.setState({ keysPressed: [] });
  }

  @autobind
  private confirmPressedKey() {
    this.setState({ pressedKey: undefined });
  }

  private launchToastMessage() {
    const { password, showToast } = this.props;
    const { keysPressed } = this.state;

    if (isEqual(keysPressed, password)) {
      showToast && showToast("Correct!", false);
    } else {
      showToast && showToast("Whoops, not quite right", true);
    }
  }
}
