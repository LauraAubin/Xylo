import * as React from "react";

import { Button, DisplayText, Stack, TextField } from "@shopify/polaris";
import { getRandomInt } from "../../../../../Utilities/Utilities";

import "../../Welcome.scss";

interface Props {
  userName: string;
  userAge: string;
  handleUserNameChange(value: string): void;
  handleUserAgeChange(value: string): void;
  onStartButtonClick(uid: string): void;
}

export default class UserIntroPage extends React.Component<Props> {
  public render() {
    const {
      userName,
      userAge,
      handleUserNameChange,
      handleUserAgeChange,
      onStartButtonClick
    } = this.props;

    const uid = userName.charAt(0) + userAge + "-" + getRandomInt(100);

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
              onChange={handleUserNameChange}
            />
            <TextField
              label="How old are you?"
              type="number"
              value={userAge}
              onChange={handleUserAgeChange}
            />
            <Button primary onClick={onStartButtonClick.bind(this, uid)}>
              Get started
            </Button>
          </Stack>
        </div>
      </div>
    );
  }
}
