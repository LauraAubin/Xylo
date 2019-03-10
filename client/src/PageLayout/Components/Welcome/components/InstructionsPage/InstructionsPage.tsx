import * as React from "react";

import { Button, DisplayText, TextContainer } from "@shopify/polaris";

import "../Welcome.scss";

interface Props {
  nextPage(): void;
}

export default class InstuctionsPage extends React.Component<Props> {
  public render() {
    const { nextPage } = this.props;

    return (
      <div className="CenterElements">
        <TextContainer>
          <DisplayText size="small">Instructions</DisplayText>
          <div>
            The purpose of this app is to test your ability to remember
            passwords.
          </div>
          <div>
            First you'll be assigned 3 different passwords, which you'll have
            the opportunity to practice before moving forward.
          </div>
          <div>Next, you'll have to recite them in a random order.</div>
          <Button primary onClick={nextPage}>
            I understand
          </Button>
        </TextContainer>
      </div>
    );
  }
}
