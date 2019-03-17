import * as React from "react";

import { Button } from "@shopify/polaris";

import autobind from "autobind-decorator";
import Xylophone from "./components/Xylophone";

import "./XylophoneContainer.scss";

interface Props {
  numberOfKeys: number;
  generatedPassword: number[];
}

interface State {
  repeatPasswordVisualization: number;
}

export default class XylophoneContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { repeatPasswordVisualization: 0 };
  }

  public render() {
    const { numberOfKeys, generatedPassword } = this.props;
    const { repeatPasswordVisualization } = this.state;

    return (
      <div className="Center">
        <Xylophone
          numberOfKeys={numberOfKeys}
          generatedPassword={generatedPassword}
          repeatPasswordVisualization={repeatPasswordVisualization}
        />
        <Button plain onClick={this.visualizePassword}>
          Play password
        </Button>
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
