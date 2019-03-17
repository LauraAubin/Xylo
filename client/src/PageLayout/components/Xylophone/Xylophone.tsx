import * as React from "react";

import { Button } from "@shopify/polaris";

import autobind from "autobind-decorator";
import Key from "./Key";

import "./Xylophone.scss";

interface Props {
  numberOfKeys: number;
  generatedPassword: number[];
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

export default class Xylophone extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { animationIterator: 0, intervalInstance: undefined };
  }

  public render() {
    return (
      <>
        <Button onClick={this.visualizePassword}>Play password</Button>
        <div className="KeysContainer">{this.renderKeys()}</div>
      </>
    );
  }

  private renderKeys() {
    const { numberOfKeys } = this.props;

    const keys = [];
    for (let i = 1; i < numberOfKeys + 1; i++) {
      keys.push(
        <div
          className={`SeparateKeys`}
          id={`keyContainer-${i}`}
          key={`Key-${i}`}
        >
          <Key identifier={i} key={i} />
        </div>
      );
    }

    return keys;
  }

  @autobind
  private visualizePassword() {
    const interval = setInterval(
      () => this.animateNextKey(),
      PULSE_DURATION + 100
    );

    this.setState({ intervalInstance: interval });
  }

  private animateNextKey() {
    const { animationIterator } = this.state;

    this.addKeyAnimations();
    this.removeKeyAnimations();

    this.setState({ animationIterator: animationIterator + 1 });

    this.checkToStopAnimationCycle();
  }

  private checkToStopAnimationCycle() {
    const { generatedPassword } = this.props;
    const { animationIterator, intervalInstance } = this.state;

    const fullyTraversedPassword =
      animationIterator === generatedPassword.length;

    if (fullyTraversedPassword) {
      clearInterval(intervalInstance);

      this.setState({ animationIterator: 0 });
    }
  }

  private addKeyAnimations() {
    const { generatedPassword } = this.props;
    const { animationIterator } = this.state;

    const specificKeyValue = generatedPassword[animationIterator];

    this.pulse(AnimationActions.Add, specificKeyValue);
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
