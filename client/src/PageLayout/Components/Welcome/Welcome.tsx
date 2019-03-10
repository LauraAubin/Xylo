import * as React from "react";

import {
  Button,
  Card,
  DisplayText,
  Stack,
  TextContainer,
  TextField
} from "@shopify/polaris";
import { getRandomInt } from "../../../Utilities/Utilities";

import "./Welcome.scss";

interface Props {
  onStartButtonClick(uid: string): void;
}

interface State {
  pages: React.ReactNode[];
  userName: string;
  userAge: string;
}

export default class Welcome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pages: [],
      userName: "",
      userAge: "20"
    };
  }

  componentDidMount() {
    const { onStartButtonClick } = this.props;
    const { pages, userName, userAge } = this.state;

    const uid = userName.charAt(0) + userAge + "-" + getRandomInt(100);

    const welcomeMarkup = (
      <div className="CenterElements">
        <div className="Title">
          <DisplayText size="medium">Welcome to Xylo</DisplayText>
        </div>
        <div>
          <Button primary onClick={this.nextPage}>
            Let's begin
          </Button>
        </div>
      </div>
    );

    const instructionsMarkup = (
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
          <Button primary onClick={this.nextPage}>
            I understand
          </Button>
        </TextContainer>
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

    pages.push(welcomeMarkup, instructionsMarkup, userIntro);

    this.setState({ pages });
  }

  public nextPage = () => {
    const { pages } = this.state;

    pages.shift();

    this.setState({ pages });
  };

  handleUserNameChange = (value: string) => {
    this.setState({ userName: value });
  };

  handleUserAgeChange = (value: string) => {
    this.setState({ userAge: value });
  };

  public render() {
    const { pages } = this.state;

    return (
      <div className="CenterElement">
        <Card>{pages[0]}</Card>
      </div>
    );
  }
}
