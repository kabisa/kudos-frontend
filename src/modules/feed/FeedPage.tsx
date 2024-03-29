import { Component } from "react";
import { PullToRefresh } from "../../components";
import { CreatePost, RightRail } from "./components";
import { GetPostsResult } from "./queries";

import KudoBoard from "../../components/organisms/KudoBoard/KudoBoard";
import Page from "../../components/templates/Page";
import { Desktop, TabletAndBelow } from "../../support/breakpoints";

import styles from "./FeedPage.module.scss";

export interface Props {
  data: {
    loading: boolean;
    error: object;

    // Query result
    teamById: GetPostsResult;
    loadMore: any;
  };
}

export interface FeedPageProps {
  // Future props go here
}

export interface FeedPageState {
  // Future state vars go here
}

export class FeedPage extends Component<FeedPageProps, FeedPageState> {
  constructor(props: FeedPageProps) {
    super(props);
    PullToRefresh.init({
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
  }

  render() {
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
  }
}

export default FeedPage;
