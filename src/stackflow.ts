import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { preloadPlugin } from "@stackflow/plugin-preload";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";
import dynamic from "next/dynamic";

import { preloadNextPageProps } from "./lib/preloadNextPageProps";
import { pagePropsMap } from "./lib/readPageProps";

const isServer = typeof window === "undefined";

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

export type TypeActivities = typeof activities;
