import * as React from "react";

import { Icon, Stack, TextStyle } from "@shopify/polaris";

export interface Props {
  step: number;
  buttonText: string;
  onClick(): void;
}

import "./PasswordStack.scss";

export default class PasswordStack extends React.Component<Props> {
  public render() {
    const { step, buttonText, onClick } = this.props;

    const passwordRecallInitialStep = 3;

    const pageMarkup = [
      { type: "Shopping", color: "blue", icon: "products" },
      { type: "Home", color: "teal", icon: "home" },
      { type: "Phone", color: "red", icon: "notification" }
    ].map((item, index) => (
      <div className="StackElement">
        <Stack alignment="center">
          <Stack.Item>
            <div className={`Circle Circle--${item.color}`}>
              <Icon
                source={
                  item.icon === "products"
                    ? "products"
                    : item.icon === "home"
                    ? "home"
                    : "notification"
                }
                color="white"
              />
            </div>
          </Stack.Item>
          <Stack.Item fill>
            <TextStyle variation="subdued">{item.type}</TextStyle>
          </Stack.Item>
          <Stack.Item>
            {(index === step || index + passwordRecallInitialStep === step) && (
              <ul className={`ArrowButton ArrowButton--${item.color}`}>
                <li>
                  <a onClick={onClick}>{buttonText}</a>
                </li>
              </ul>
            )}
          </Stack.Item>
        </Stack>
      </div>
    ));

    return pageMarkup;
  }
}
