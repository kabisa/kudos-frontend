import React, { Component } from "react";
import { PullToRefresh } from "../../components";
import { CreatePost, RightRail } from "./components";
import { GetPostsResult } from "./queries";

import { Desktop, TabletAndBelow } from "../../support/breakpoints";
import Segment from "../../components/atoms/Segment";
import Page from "../../components/templates/Page";
import KudoBoard from "../../components/organisms/KudoBoard/KudoBoard";

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
          return document.getElementsByClassName("page")[0].scrollTop === 0;
        } catch (error) {
          return true;
        }
      },
    });
  }

  render() {
    return (
      <Page>
        <TabletAndBelow>
          <div className={styles.create_post_container_mobile}>
            <CreatePost back={false} />
          </div>
          <KudoBoard />
        </TabletAndBelow>
        <Desktop>
          <div className={styles.grid}>
            <div className={styles.column}>
              <Segment>
                <CreatePost back={false} />
              </Segment>
              <KudoBoard className={styles.leftColumn} />
            </div>
            <RightRail />
          </div>
        </Desktop>
      </Page>
    );
  }
}

export default FeedPage;
