import * as React from "react";

import autobind from "autobind-decorator";

import { Button } from "@shopify/polaris";
import { fetchRequest } from "../../../Utilities/Utilities";

interface State {
  logFile: string;
}

export default class LogFile extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { logFile: "" };
  }

  public render() {
    const { logFile } = this.state;

    return (
      <div>
        <Button onClick={this.readLogFile}>Show contents of log file</Button>
        <div>{logFile}</div>
        <Button onClick={this.editLogFile}>Write to the log file</Button>
      </div>
    );
  }

  @autobind
  private readLogFile() {
    this.getFileContents("./LogFile.txt");
  }

  private getFileContents = async (file: string) => {
    await fetchRequest("post", "readFile", { file })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ logFile: data.fileContents });
      });
  };

  private editLogFile = async () => {
    const { logFile } = this.state;

    const updateLogFile = logFile + `\n${new Date()}`;

    this.setState({ logFile: updateLogFile });

    fetchRequest("post", "writeFile", {
      contents: updateLogFile,
      file: "./LogFile.txt"
    });
  };
}
