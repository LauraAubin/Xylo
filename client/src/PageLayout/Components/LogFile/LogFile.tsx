import * as React from "react";
import moment from "moment";

import { fetchRequest, noop } from "../../../Utilities/Utilities";

interface Props {
  newEntry: string;
  uid: string;
}

interface State {
  logFile: string;
}

export default class LogFile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { logFile: "" };
  }

  componentDidMount() {
    this.get("./LogFile.csv");
  }

  componentDidUpdate(prevProps: Props) {
    const { newEntry } = this.props;

    if (prevProps.newEntry !== newEntry) {
      this.add();
    }
  }

  public render() {
    return noop;
  }

  private get = async (file: string) => {
    await fetchRequest("post", "readFile", { file })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ logFile: data.fileContents });
      });
  };

  private add = async () => {
    const newEntry = this.buildNewEntry();
    const updateLogFile = this.inputNewEntry(newEntry);

    this.setState({ logFile: updateLogFile });

    fetchRequest("post", "writeFile", {
      contents: updateLogFile,
      file: "./LogFile.csv"
    });
  };

  private buildNewEntry() {
    const { newEntry, uid } = this.props;

    return `${this.getCurrentTime()},${uid},xylo21,${newEntry},`;
  }

  private inputNewEntry(newEntry: string) {
    const { logFile } = this.state;

    return logFile + `\n${newEntry}`;
  }

  private getCurrentTime() {
    return moment().format("h:mm:ss");
  }
}
