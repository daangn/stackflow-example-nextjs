import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { preloadPlugin } from "@stackflow/plugin-preload";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";
import dynamic from "next/dynamic";
import * as r from "next/router";

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

export async function preloadNextPageData({
  path,
  route,
  activityParams,
}: {
  path: string;
  route: string;
  activityParams: any;
}) {
  const { router } = r as any;

  const nextState = router.state;

  const nextRoute = route
    .split("/")
    .map((chunk) => {
      if (chunk.startsWith(":")) {
        return `[${chunk.slice(1, chunk.length)}]`;
      }
      return chunk;
    })
    .join("/");

  const data = await router.getRouteInfo({
    as: path,
    resolvedAs: path,
    route: nextRoute,
    pathname: nextRoute,
    query: activityParams,
    locale: nextState.locale,
    isPreview: nextState.isPreview,
    routeProps: {
      shallow: false,
    },
    hasMiddleware: false,
    unstable_skipClientCache: undefined,
  });

  return data;
}

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
        Main({ activityParams, eventContext, initContext, isInitialActivity }) {
          const key = `Main#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: initContext.pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageData({
              activityParams,
              route: routes.Article,
              path: eventContext["plugin-history-sync"].path,
            }).then((data) => {
              pagePropsMap[key] = {
                _t: "ok",
                pageProps: data.props.pageProps,
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
          eventContext,
          initContext,
          isInitialActivity,
        }) {
          const key = `Article#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            pagePropsMap[key] = {
              _t: "ok",
              pageProps: initContext.pageProps,
            };
          }

          if (!pagePropsMap[key]) {
            const promise = preloadNextPageData({
              activityParams,
              route: routes.Article,
              path: eventContext["plugin-history-sync"].path,
            }).then((data) => {
              pagePropsMap[key] = {
                _t: "ok",
                pageProps: data.props.pageProps,
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
        NotFound() {
          return null;
        },
      },
    }),
  ],
});

export type TypeActivities = typeof activities;
