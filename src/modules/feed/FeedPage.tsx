import React, { Component } from "react";
import { Divider, Grid, GridColumn, Segment } from "semantic-ui-react";
import { PullToRefresh } from "../../components";
import { Navigation } from "../../components/navigation";
import { CreatePost, RightRail } from "./components";
import { GetPostsResult } from "./queries";
import { RepoList } from "./RepoList";

import s from "./FeedPage.module.scss";
import { Desktop, TabletAndBelow } from "../../support/breakpoints";

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
  <div className={s.board_container}>
    <h2 className={s.board_header}>Shout out messageboard</h2>
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
      <div className={s.container}>
        <div className="page">
          <TabletAndBelow>
            <div className={s.create_post_container_mobile}>
              <CreatePost back={false} />
            </div>
            <Divider hidden />
            <KudoBoard />
          </TabletAndBelow>
          <Desktop>
            <Grid centered columns={2} className={s.grid}>
              <GridColumn className={s.grid_column}>
                <Segment className={s.create_post_segment}>
                  <CreatePost back={false} />
                </Segment>
                <KudoBoard />
              </GridColumn>
              <GridColumn className={`${s.grid_column} ${s.left_column}`}>
                <RightRail />
              </GridColumn>
            </Grid>
          </Desktop>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default FeedPage;
