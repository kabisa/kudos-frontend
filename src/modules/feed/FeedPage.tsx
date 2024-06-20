import React, { useEffect } from "react";
import { PullToRefresh } from "../../components";
import { CreatePost, RightRail } from "./components";

import KudoBoard from "../../components/organisms/KudoBoard/KudoBoard";
import Page from "../../components/templates/Page";
import { Desktop, TabletAndBelow } from "../../support/breakpoints";

import styles from "./FeedPage.module.scss";

const FeedPage: React.FC = () => {
  useEffect(() => {
    const refresh = PullToRefresh.init({
      mainElement: "body",
      onRefresh() {
        window.location.reload();
      },
      shouldPullToRefresh() {
        try {
          return document.getElementsByClassName("feed")[0].scrollTop === 0;
        } catch (error) {
          return true;
        }
      },
    });

    return () => refresh.destroy();
  }, []);

  return (
    <Page className={"feed"}>
      <TabletAndBelow>
        <div className={styles.tabletAndBelowContainer}>
          <CreatePost back={false} />
          <KudoBoard />
        </div>
      </TabletAndBelow>
      <Desktop>
        <div className={styles.grid}>
          <div className={styles.column}>
            <CreatePost back={false} />
            <KudoBoard />
          </div>
          <RightRail />
        </div>
      </Desktop>
    </Page>
  );
};

export default FeedPage;
