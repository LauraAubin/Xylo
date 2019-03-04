import * as React from "react";

import PageLayout from "./PageLayout";

import { AppProvider } from "@shopify/polaris";

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
