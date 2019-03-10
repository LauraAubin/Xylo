import * as React from "react";

import { Button, DisplayText } from "@shopify/polaris";

import "../Welcome.scss";

interface Props {
  nextPage(): void;
}

export default class WelcomePage extends React.Component<Props> {
  public render() {
    const {nextPage} = this.props;

    return (
      <div className="CenterElements">
        <div className="Title">
          <DisplayText size="medium">Welcome to Xylo</DisplayText>
        </div>
        <div>
          <Button primary onClick={nextPage}>
            Let's begin
          </Button>
        </div>
      </div>
    );
  }
}
