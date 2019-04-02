import * as React from "react";
import moment from "moment";

import { Button, DisplayText, Stack, TextField } from "@shopify/polaris";
import { getRandomInt } from "../../../../../Utilities/Utilities";

import "../../Welcome.scss";

interface Props {
  onStartButtonClick(uid: string): void;
}

interface State {
  userName: string;
  userAge: string;
}

export default class UserIntroPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userName: "",
      userAge: "20"
    };
  }

  public render() {
    const { onStartButtonClick } = this.props;
    const { userName, userAge } = this.state;

    const date = moment().format("M/D/YY");
    const uid = date + "-" + getRandomInt(100);

    return (
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
              label="How old are you?"
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
  }

  handleUserNameChange = (value: string) => {
    this.setState({ userName: value });
  };

  handleUserAgeChange = (value: string) => {
    this.setState({ userAge: value });
  };
}
