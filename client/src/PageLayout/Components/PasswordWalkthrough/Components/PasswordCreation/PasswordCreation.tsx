import * as React from "react";

import XylophoneContainer from "../../../XylophoneContainer";

const PASSWORD_OPTIONS = 12;
const PASSWORD_LENGTH = 6;

export default class PasswordCreation extends React.Component {
  public render() {
    return (
      <XylophoneContainer
        numberOfKeys={PASSWORD_OPTIONS}
        generatedPassword={this.generatePassword()}
      />
    );
  }

  private generatePassword() {
    return Array.from({ length: PASSWORD_LENGTH }, () =>
      Math.ceil(Math.random() * PASSWORD_OPTIONS)
    );
  }
}
