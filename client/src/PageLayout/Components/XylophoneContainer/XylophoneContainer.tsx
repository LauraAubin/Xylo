import * as React from "react";

import { Button } from "@shopify/polaris";

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
  stopPracticing?(): void;
}

interface State {
  repeatPasswordVisualization: number;
  keysPressed: number[];
}

export default class XylophoneContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { repeatPasswordVisualization: 0, keysPressed: [] };
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
    const { numberOfKeys, password, type, practiceMode } = this.props;
    const { repeatPasswordVisualization } = this.state;

    return (
      <div className="Center">
        <Xylophone
          numberOfKeys={numberOfKeys}
          generatedPassword={password}
          repeatPasswordVisualization={repeatPasswordVisualization}
          practiceMode={practiceMode}
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
  private addNewPressedKey(key: number) {
    const { practiceMode, password, stopPracticing } = this.props;
    const { keysPressed } = this.state;

    if (practiceMode) {
      keysPressed.push(key);

      this.setState({ keysPressed });

      const fullPasswordLengthExplored = keysPressed.length === password.length;
      if (fullPasswordLengthExplored) {
        stopPracticing && stopPracticing();
      }
    }
  }

  private resetKeysPressed() {
    this.setState({ keysPressed: [] });
  }
}
