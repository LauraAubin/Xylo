import * as React from "react";

import { Button } from "@shopify/polaris";

interface Props {
  onStartButtonClick(): void;
}

export default class Welcome extends React.Component<Props> {
  public render() {
    const { onStartButtonClick } = this.props;

    return (
      <>
        <div>This is a welcome intro to the app</div>
        <Button onClick={onStartButtonClick}>
          Click me to start experiment
        </Button>
      </>
    );
  }
}
