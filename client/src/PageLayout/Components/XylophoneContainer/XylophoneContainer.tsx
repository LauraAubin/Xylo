import * as React from "react";

import { Button } from "@shopify/polaris";

import autobind from "autobind-decorator";
import Xylophone from "./components/Xylophone";

interface State {
  repeatPasswordVisualization: number;
}

export default class XylophoneContainer extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);

    this.state = { repeatPasswordVisualization: 0 };
  }

  public render() {
    const { repeatPasswordVisualization } = this.state;

    return (
      <div>
        <Button onClick={this.visualizePassword}>Play password</Button>
        <Xylophone
          numberOfKeys={5}
          generatedPassword={[1, 2, 2]}
          repeatPasswordVisualization={repeatPasswordVisualization}
        />
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
}
