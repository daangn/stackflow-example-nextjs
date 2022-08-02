import * as r from "next/router";

export async function preloadNextPageProps({
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

  const routeInfo = await router.getRouteInfo({
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

  return routeInfo.props.pageProps;
}
