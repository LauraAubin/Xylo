import * as React from "react";

import LogFile from "./LogFile";
import Welcome from "./Welcome";

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
    const { introduction } = this.state;

    return introduction ? (
      <Welcome onStartButtonClick={this.startExperiment} />
    ) : (
      <>
        <div>Actual page</div>
        <LogFile />
      </>
    );
  }
}
