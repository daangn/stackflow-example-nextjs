import { useActivity } from "@stackflow/react";
import React from "react";

import IconBell from "../assets/IconBell";
import IconExpandMore from "../assets/IconExpandMore";
import IconSearch from "../assets/IconSearch";
import IconSettings from "../assets/IconSettings";
import BottomTab from "../components/BottomTab";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";
import { readPageProps } from "../lib/readPageProps";
import { MainPageProps } from "../pages";
import * as css from "./Main.css";

const Main: React.FC = () => {
  const activity = useActivity();
  const data = readPageProps<MainPageProps>(activity.preloadRef);

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
    <Layout
      appBar={{
        appendLeft: appBarLeft,
        appendRight: appBarRight,
      }}
    >
      <div className={css.wrapper}>
        <div className={css.scrollable}>
          {data.articles.map((article) => (
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
    </Layout>
  );
};

export default Main;
