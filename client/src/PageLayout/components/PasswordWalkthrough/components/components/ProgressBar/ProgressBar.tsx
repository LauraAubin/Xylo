import * as React from "react";

import { ProgressBar as PolarisProgressBar } from "@shopify/polaris";

import { flow } from "../../../flow";

interface Props {
  step: number;
  text?: string;
}

export default class ProgressBar extends React.Component<Props> {
  public render() {
    const { step, text = "Progress" } = this.props;

    const totalSteps = flow(
      [],
      []
    ).length;

    const progressionPercentage = this.calculatePercentage(step, totalSteps);

    return (
      <div className="ProgressBarContainer">
        <div className="ProgressText">{text}</div>
        <PolarisProgressBar
          progress={this.dropDecimals(progressionPercentage)}
        />
      </div>
    );
  }

  private calculatePercentage(current: number, total: number) {
    return (current / total) * 100;
  }

  private dropDecimals(number: number) {
    return Math.trunc(number);
  }
}
