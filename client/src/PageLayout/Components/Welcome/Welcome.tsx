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
}

export default class Welcome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { pages: [] };
  }

  componentDidMount() {
    const { onStartButtonClick } = this.props;
    const { pages } = this.state;

    pages.push(
      <WelcomePage nextPage={this.nextPage} />,
      <InstuctionsPage nextPage={this.nextPage} />,
      <UserIntroPage onStartButtonClick={onStartButtonClick} />
    );

    this.setState({ pages });
  }

  public nextPage = () => {
    const { pages } = this.state;

    pages.shift();

    this.setState({ pages });
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
