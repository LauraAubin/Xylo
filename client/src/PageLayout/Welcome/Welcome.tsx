import * as React from "react";

import { Button, Card, DisplayText } from "@shopify/polaris";

import "./Welcome.scss";

interface Props {
  onStartButtonClick(): void;
}

export default class Welcome extends React.Component<Props> {
  public render() {
    const { onStartButtonClick } = this.props;

    return (
      <div className="CenterCard">
        <Card>
          <div className="CenterElements">
            <div className="Title">
              <DisplayText size="medium">Welcome to Xylo</DisplayText>
            </div>
            <div>
              <Button primary onClick={onStartButtonClick}>Let's begin</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
