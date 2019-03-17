import * as React from "react";

import { AppProvider } from "@shopify/polaris";

import PageLayout from "./PageLayout";

import "./GlobalStyles/OverridePolaris.scss";

class App extends React.Component {
  public render() {
    return (
      <AppProvider>
        <PageLayout />
      </AppProvider>
    );
  }
}
export default App;
