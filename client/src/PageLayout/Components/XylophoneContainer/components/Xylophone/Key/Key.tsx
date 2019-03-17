import * as React from "react";

import Screw from "./Screw";

import "./Key.scss";

interface Props {
  identifier: number;
}

export default class Key extends React.Component<Props> {
  public render() {
    const { identifier } = this.props;

    return (
      <div className={`Key-${identifier}`} id={`key-${identifier}`}>
        <Screw />
        <Screw />
      </div>
    );
  }
}
