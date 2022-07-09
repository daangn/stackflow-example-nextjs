export const pagePropsMap: {
  [activityId: string]:
    | { _t: "pending"; promise: Promise<any> }
    | { _t: "ok"; pageProps: any };
} = {};

export function readPageProps<T>(preloadRef?: any): T {
  const preloadData = pagePropsMap[preloadRef.activityId];

  switch (preloadData._t) {
    case "pending":
      throw preloadData.promise;
    case "ok":
      return preloadData.pageProps;
  }
}
