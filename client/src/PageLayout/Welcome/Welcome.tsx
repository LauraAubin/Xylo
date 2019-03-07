import * as React from "react";

import { Button, Card, DisplayText, Stack, TextField } from "@shopify/polaris";
import { getRandomInt } from "../../Utilities/Utilities";

import "./Welcome.scss";

interface Props {
  onStartButtonClick(uid: string): void;
}

interface State {
  beginUserIntro: boolean;
  userName: string;
  userAge: string;
}

export default class Welcome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { beginUserIntro: false, userName: "", userAge: "20" };
  }

  public startUserIntro = () => {
    this.setState({ beginUserIntro: true });
  };

  handleUserNameChange = (value: string) => {
    this.setState({ userName: value });
  };

  handleUserAgeChange = (value: string) => {
    this.setState({ userAge: value });
  };

  public render() {
    const { onStartButtonClick } = this.props;
    const { beginUserIntro, userName, userAge } = this.state;

    const uid = userName.charAt(0) + userAge + getRandomInt(100);

    const welcomeMarkup = (
      <div className="CenterElements">
        <div className="Title">
          <DisplayText size="medium">Welcome to Xylo</DisplayText>
        </div>
        <div>
          <Button primary onClick={this.startUserIntro}>
            Let's begin
          </Button>
        </div>
      </div>
    );

    const userIntro = (
      <div className="CenterElements">
        <div className="Title">
          <DisplayText size="medium">
            Tell me a little about yourself
          </DisplayText>
        </div>
        <div className="FullWidth">
          <Stack vertical spacing="loose">
            <TextField
              label="What's your name?"
              value={userName}
              onChange={this.handleUserNameChange}
            />
            <TextField
              label="How old you are?"
              type="number"
              value={userAge}
              onChange={this.handleUserAgeChange}
            />
            <Button primary onClick={onStartButtonClick.bind(this, uid)}>
              Get started
            </Button>
          </Stack>
        </div>
      </div>
    );

    return (
      <div className="CenterCard">
        <Card>{beginUserIntro ? userIntro : welcomeMarkup}</Card>
      </div>
    );
  }
}
