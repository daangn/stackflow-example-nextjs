import { useActivity } from "@stackflow/react";
import React from "react";

import IconBell from "../assets/IconBell";
import IconExpandMore from "../assets/IconExpandMore";
import IconSearch from "../assets/IconSearch";
import IconSettings from "../assets/IconSettings";
import BottomTab from "../components/BottomTab";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";
import * as css from "./Main.css";

const Main: React.FC = () => {
  const activity = useActivity();
  // const data = readPreloadData<Queries.MainTemplateQueryQuery>(
  //   activity.preloadRef,
  // );

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
          <FeedCard
            key="1234"
            articleId="1234"
            daysAgo={7}
            price={29}
            region="Seoul"
            title="Hello, World!"
          />
        </div>
        <div className={css.bottom}>
          <BottomTab />
        </div>
      </div>
    </Layout>
  );
};

export default Main;
