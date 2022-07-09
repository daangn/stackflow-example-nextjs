import "@stackflow/basic-ui/index.css";
import "@seed-design/stylesheet/global.css";
import "../styles/index.css";

import App from "next/app";
import Script from "next/script";
import React from "react";
import dedent from "ts-dedent";

import { AppScreenThemeProvider } from "../AppScreenThemeContext";
import { Stack } from "../stackflow";

const SEED_SCALE_COLOR_SCRIPT = dedent`
  (() => {var e=document.documentElement;e.dataset.seed="";var pd=window.matchMedia("(prefers-color-scheme: dark)"),a=()=>{e.dataset.seedScaleColor=pd.matches?"dark":"light"};"addEventListener"in pd?pd.addEventListener("change",a):"addListener"in pd&&pd.addListener(a),a();})()
`;
const STACKFLOW_BASIC_UI_THEME_SCRIPT = dedent`
  (() => {var c=/iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase()),e=document.documentElement;e.dataset.stackflowBasicUiTheme=c?"cupertino":"android";})()
`;

export default class MyApp extends App {
  render() {
    return (
      <React.StrictMode>
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: SEED_SCALE_COLOR_SCRIPT }}
        />
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: STACKFLOW_BASIC_UI_THEME_SCRIPT }}
        />
        <AppScreenThemeProvider>
          <React.Suspense fallback="loading...">
            <Stack
              context={{
                req: { path: this.props.router.asPath },
                pageProps: this.props.pageProps,
              }}
            />
          </React.Suspense>
        </AppScreenThemeProvider>
      </React.StrictMode>
    );
  }
}

// getInitialProps가 있으면 this.props.router.asPath가 제대로 들어온다
MyApp.getInitialProps = async ({ Component, ctx }) => ({
  pageProps: {
    ...(await Component.getInitialProps?.(ctx)),
  },
});
