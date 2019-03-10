import * as React from "react";

import { Card } from "@shopify/polaris";

import WelcomePage from "./components/WelcomePage";
import InstuctionsPage from "./components/InstructionsPage";
import UserIntroPage from "./components/UserIntroPage";

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

    pages.push(
      <WelcomePage nextPage={this.nextPage} />,
      <InstuctionsPage nextPage={this.nextPage} />,
      <UserIntroPage
        userName={userName}
        userAge={userAge}
        handleUserNameChange={this.handleUserNameChange}
        handleUserAgeChange={this.handleUserAgeChange}
        onStartButtonClick={onStartButtonClick}
      />
    );

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

    const firstPage = 0;

    return (
      <div className="CenterElement">
        <Card>{pages[firstPage]}</Card>
      </div>
    );
  }
}
