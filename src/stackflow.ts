import { vars } from "@seed-design/design-token";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { preloadPlugin } from "@stackflow/plugin-preload";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";
import dynamic from "next/dynamic";

import { preloadNextPageProps } from "./lib/preloadNextPageProps";
import { pagePropsMap } from "./lib/readPageProps";

const isServer = typeof window === "undefined";

const theme =
  !isServer && /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
    ? "cupertino"
    : "android";

const borderColor =
  theme === "cupertino"
    ? vars.$semantic.color.divider3
    : vars.$semantic.color.divider2;

const activities = {
  Main: dynamic(() => import("./activities/Main"), {
    suspense: !isServer,
  }),
  Article: dynamic(() => import("./activities/Article"), {
    suspense: !isServer,
  }),
  NotFound: dynamic(() => import("./activities/NotFound"), {
    suspense: !isServer,
  }),
};
export type TypeActivities = typeof activities;

const routes = {
  Main: "/",
  Article: "/articles/:articleId",
  NotFound: "/404",
};

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme,
      backgroundColor: vars.$semantic.color.paperDefault,
      appBar: {
        borderColor,
        textColor: vars.$scale.color.gray900,
        iconColor: vars.$scale.color.gray900,
      },
    }),
    historySyncPlugin({
      routes,
      fallbackActivity: () => "NotFound",
    }),
    preloadPlugin({
      loaders: {
        Main({
          activityParams,
          activityContext,
          initContext,
          isInitialActivity,
        }) {
          const key = `Main#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.Article,
              path: (activityContext as any).path,
            }).then((pageProps) => {
              pagePropsMap[key] = {
                _t: "ok",
                pageProps,
              };
            });

            pagePropsMap[key] = {
              _t: "pending",
              promise,
            };
          }

          return {
            key,
          };
        },
        Article({
          activityParams,
          activityContext,
          initContext,
          isInitialActivity,
        }) {
          const key = `Article#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: (initContext as any).pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageProps({
              activityParams,
              route: routes.Article,
              path: (activityContext as any).path,
            }).then((pageProps) => {
              pagePropsMap[key] = {
                _t: "ok",
                pageProps,
              };
            });

            pagePropsMap[key] = {
              _t: "pending",
              promise,
            };
          }

          return {
            key,
          };
        },
      },
    }),
  ],
});
