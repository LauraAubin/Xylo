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
    const { generatedPassword } = this.props;
    const { animationIterator } = this.state;

    const specificKeyValue = generatedPassword[animationIterator];

    this.addPulse(specificKeyValue);
    this.removePulse(specificKeyValue);

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

  private findKey(identifier: number, type: string) {
    return document.getElementById(`${type}-${identifier}`);
  }

  private addPulse(keyValue: number) {
    const foundKeyContainer = this.findKey(keyValue, "keyContainer");
    const foundKey = this.findKey(keyValue, "key");

    foundKeyContainer && foundKeyContainer.classList.add("KeyPulse");

    setTimeout(function() {
      foundKey && foundKey.classList.add(`Key-${keyValue}-Active`);
    }, 100);
  }

  private removePulse(keyValue: number) {
    const foundKeyContainer = this.findKey(keyValue, "keyContainer");
    const foundKey = this.findKey(keyValue, "key");

    setTimeout(function() {
      foundKeyContainer && foundKeyContainer.classList.remove("KeyPulse");
      foundKey && foundKey.classList.remove(`Key-${keyValue}-Active`);
    }, PULSE_DURATION);
  }
}
