import * as React from "react";

import { Icon, Stack, TextStyle } from "@shopify/polaris";

export interface Props {
  step: number;
  elements: { type: string; color: string; icon: string }[];
  buttonText: string;
  onClick(): void;
}

import "./PasswordStack.scss";

export default class PasswordStack extends React.Component<Props> {
  public render() {
    const { step, elements, buttonText, onClick } = this.props;

    const passwordRecallInitialStep = 3;

    const pageMarkup = elements.map((item, index) => (
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
