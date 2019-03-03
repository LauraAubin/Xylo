import * as React from "react";

import { AppProvider } from "@shopify/polaris";

class App extends React.Component {
  public render() {
    return (
      <AppProvider>
        <div>Hello world!</div>
      </AppProvider>
    );
  }
}
export default App;
