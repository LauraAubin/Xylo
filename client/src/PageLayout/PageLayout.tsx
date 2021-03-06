import * as React from "react";

import Welcome from "./components/Welcome";
import PasswordWalkthrough from "./components/PasswordWalkthrough";

interface State {
  introduction: boolean;
  uid: string;
}

export default class PageLayout extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { introduction: true, uid: "" };
  }

  public startExperiment = (uid: string) => {
    this.setState({ introduction: false, uid });
  };

  public render() {
    const { introduction, uid } = this.state;

    return introduction ? (
      <Welcome onStartButtonClick={this.startExperiment} />
    ) : (
      <PasswordWalkthrough uid={uid} />
    );
  }
}
