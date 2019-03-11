import * as React from "react";

import Key from "./Key";

import "./Xylophone.scss";

interface Props {
  numberOfKeys: number;
}

export default class Xylophone extends React.Component<Props> {
  public render() {
    return <div className="KeysContainer">{this.renderKeys()}</div>;
  }

  private renderKeys() {
    const { numberOfKeys } = this.props;

    const keys = [];
    for (let i = 1; i < numberOfKeys + 1; i++) {
      keys.push(<Key identifier={i} key={i} />);
    }

    return keys;
  }
}
