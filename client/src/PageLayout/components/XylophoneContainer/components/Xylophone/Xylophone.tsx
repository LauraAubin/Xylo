import * as React from "react";

import { Icon } from "@shopify/polaris";

import autobind from "autobind-decorator";
import Key from "./Key";

import "./Xylophone.scss";

interface Props {
  numberOfKeys: number;
  generatedPassword: number[];
  repeatPasswordVisualization?: number;
  practiceMode?: boolean;
  recallMode?: boolean;
  pressedKey?: number;
  singlePressedKey?(key: number): void;
  addNewPressedKey?(key: number): void;
}

interface State {
  animationIterator: number;
  intervalInstance: any;
}

const PULSE_DURATION = 1500;

enum AnimationActions {
  Add,
  Remove
}

enum AnimationType {
  Full,
  Pulse
}

export default class Xylophone extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      animationIterator: 0,
      intervalInstance: undefined
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { repeatPasswordVisualization, practiceMode } = this.props;

    if (prevProps.repeatPasswordVisualization !== repeatPasswordVisualization) {
      const animationType = practiceMode
        ? AnimationType.Pulse
        : AnimationType.Full;

      this.visualizePassword(animationType);
    }
  }

  public render() {
    return <div className="KeysContainer">{this.renderKeys()}</div>;
  }

  private renderKeys() {
    const { numberOfKeys, recallMode, pressedKey } = this.props;

    const keys = [];
    for (let i = 1; i < numberOfKeys + 1; i++) {
      keys.push(
        <div className="KeySelection">
          <div
            className={`SeparateKeys`}
            onClick={this.pressedKey(i)}
            id={`keyContainer-${i}`}
            key={`Key-${i}`}
          >
            <Key identifier={i} key={i} />
          </div>
          {recallMode && i === pressedKey && (
            <div className="KeyArrow">
              <Icon source="arrowUp" color="blue" />
            </div>
          )}
        </div>
      );
    }

    return keys;
  }

  @autobind
  private pressedKey(key: number) {
    const { recallMode, addNewPressedKey, singlePressedKey } = this.props;

    return () => {
      if (recallMode) {
        singlePressedKey && singlePressedKey(key);
      }

      addNewPressedKey && addNewPressedKey(key);
    };
  }

  @autobind
  private visualizePassword(type: AnimationType) {
    const interval = setInterval(
      () => this.animateNextKey(type),
      PULSE_DURATION + 100
    );

    this.setState({ intervalInstance: interval });
  }

  private animateNextKey(type: AnimationType) {
    const { animationIterator } = this.state;

    this.addKeyAnimations(type);
    this.removeKeyAnimations();

    this.setState({ animationIterator: animationIterator + 1 });

    this.checkToStopAnimationCycle();
  }

  private checkToStopAnimationCycle() {
    const { generatedPassword } = this.props;
    const { animationIterator } = this.state;

    const fullyTraversedPassword =
      animationIterator === generatedPassword.length;

    if (fullyTraversedPassword) {
      this.stopAnimationCycle();
    }
  }

  private stopAnimationCycle() {
    const { intervalInstance } = this.state;

    clearInterval(intervalInstance);

    this.setState({ animationIterator: 0 });
  }

  private addKeyAnimations(type: AnimationType) {
    const { generatedPassword } = this.props;
    const { animationIterator } = this.state;

    const specificKeyValue = generatedPassword[animationIterator];

    this.pulse(AnimationActions.Add, specificKeyValue);
    type === AnimationType.Full &&
      this.darkenKey(AnimationActions.Add, specificKeyValue, true);
  }

  private removeKeyAnimations() {
    const { generatedPassword } = this.props;
    const { animationIterator } = this.state;

    const specificKeyValue = generatedPassword[animationIterator];

    this.pulse(AnimationActions.Remove, specificKeyValue);
    this.darkenKey(AnimationActions.Remove, specificKeyValue);
  }

  private findKey(identifier: number, type: string) {
    return document.getElementById(`${type}-${identifier}`);
  }

  private pulse(action: AnimationActions, keyValue: number) {
    const foundKeyContainer = this.findKey(keyValue, "keyContainer");

    if (foundKeyContainer) {
      const removeKeyPulseWithDelay = setTimeout(function() {
        foundKeyContainer.classList.remove("KeyPulse");
      }, PULSE_DURATION);

      action === AnimationActions.Add
        ? foundKeyContainer.classList.add("KeyPulse")
        : removeKeyPulseWithDelay;
    }
  }

  private darkenKey(
    action: AnimationActions,
    keyValue: number,
    withAnimationDelay: boolean = false
  ) {
    const foundKey = this.findKey(keyValue, "key");

    if (foundKey) {
      const hasAnimationDelay = withAnimationDelay ? 100 : 0;
      const removeFastThanAnimation = PULSE_DURATION - 500;

      const delay =
        action === AnimationActions.Add
          ? hasAnimationDelay
          : removeFastThanAnimation;

      setTimeout(function() {
        action === AnimationActions.Add
          ? foundKey.classList.add(`Key-${keyValue}-Active`)
          : foundKey.classList.remove(`Key-${keyValue}-Active`);
      }, delay);
    }
  }
}
