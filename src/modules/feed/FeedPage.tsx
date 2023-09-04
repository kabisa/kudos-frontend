import { Component } from "react";
import { PullToRefresh } from "../../components";
import { Navigation } from "../../components/navigation";
import { CreatePost, RightRail } from "./components";
import { GetPostsResult } from "./queries";
import { RepoList } from "./RepoList";

import styles from "./FeedPage.module.scss";

import { Desktop, TabletAndBelow } from "../../support/breakpoints";
import { Icon } from "@sandercamp/ui-components";
import Segment from "../../components/atoms/Segment";

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

const KudoBoard = () => (
  <div className={styles.board_container}>
    <h2 className={styles.board_header}>Shout out messageboard</h2>
    <RepoList data-testid="repo-list" />
  </div>
);

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
      <>
        <div className="page">
          <TabletAndBelow>
            <div className={styles.create_post_container_mobile}>
              <CreatePost back={false} />
            </div>
            <KudoBoard />
            <Icon className="material-symbols-rounded" name="thumb_up" />
          </TabletAndBelow>
          <Desktop>
            <div className="grid">
              <div>
                <Segment className={styles.create_post_segment}>
                  <CreatePost back={false} />
                </Segment>
                <KudoBoard />
              </div>
              <div className={`${styles.left_column}`}>
                <RightRail />
              </div>
            </div>
          </Desktop>
        </div>
        <Navigation />
      </>
    );
  }
}

export default FeedPage;
