

import App from "next/app";
import React from "react";
import { StoreProvider } from '../store/stores';


class MyApp extends App {

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext: any) {
    const appProps = await App.getInitialProps(appContext);

    // Send it to `render`
    return {
      ...appProps
    };

  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>

    );
  }
}


export default MyApp;