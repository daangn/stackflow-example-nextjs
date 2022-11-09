import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useActivityPreloadRef } from "@stackflow/plugin-preload";
import { ActivityComponentType } from "@stackflow/react";
import React from "react";

import IconBell from "../assets/IconBell";
import IconExpandMore from "../assets/IconExpandMore";
import IconSearch from "../assets/IconSearch";
import IconSettings from "../assets/IconSettings";
import BottomTab from "../components/BottomTab";
import FeedCard from "../components/FeedCard";
import { readPageProps } from "../lib/readPageProps";
import { MainPageProps } from "../pages";
import * as css from "./Main.css";

const Main: ActivityComponentType = () => {
  const preloadRef = useActivityPreloadRef<{ key: string }>();
  const pageProps = readPageProps<MainPageProps>(preloadRef);

  const appBarLeft = () => (
    <div className={css.appBarLeft}>
      Woolston
      <div className={css.appBarLeftIcon}>
        <IconExpandMore />
      </div>
    </div>
  );

  const appBarRight = () => (
    <div className={css.appBarRight}>
      <IconSearch />
      <IconSettings />
      <IconBell />
    </div>
  );

  return (
    <AppScreen
      appBar={{
        appendLeft: appBarLeft,
        appendRight: appBarRight,
      }}
    >
      <div className={css.wrapper}>
        <div className={css.scrollable}>
          {pageProps.articles.map((article) => (
            <FeedCard
              key={article.articleId}
              articleId={article.articleId}
              daysAgo={article.daysAgo}
              price={article.price}
              region={article.region}
              title={article.title}
            />
          ))}
        </div>
        <div className={css.bottom}>
          <BottomTab />
        </div>
      </div>
    </AppScreen>
  );
};

export default Main;
