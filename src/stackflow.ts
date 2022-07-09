import { ActivityParams } from "@stackflow/core";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";
import dynamic from "next/dynamic";
import * as r from "next/router";
import { startTransition } from "react";

import { preloadDataMap } from "./lib/readPageProps";

const activities = {
  Main: dynamic(() => import("./activities/Main"), { suspense: true }),
  Article: dynamic(() => import("./activities/Article"), { suspense: true }),
};

const routes = {
  Main: "/",
  Article: "/articles/:articleId",
};

export async function preloadNextPageData({
  path,
  route,
  activityParams,
}: {
  path: string;
  route: string;
  activityParams: ActivityParams;
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
      fallbackActivity: () => "Main",
      experimental_initialPreloadRef({ activityId, context }) {
        if (!preloadDataMap[activityId]) {
          preloadDataMap[activityId] = {
            _t: "ok",
            pageProps: context.pageProps,
          };
        }
        return {
          activityId,
        };
      },
      experimental_preloadRef({ path, route, activityId, activityParams }) {
        if (!preloadDataMap[activityId]) {
          const promise = preloadNextPageData({
            path,
            route,
            activityParams,
          }).then((data) => {
            preloadDataMap[activityId] = {
              _t: "ok",
              pageProps: data.props.pageProps,
            };
          });

          preloadDataMap[activityId] = {
            _t: "pending",
            promise,
          };
        }

        return {
          activityId,
        };
      },
      experimental_startTransition: startTransition,
    }),
  ],
});

export type TypeActivities = typeof activities;
