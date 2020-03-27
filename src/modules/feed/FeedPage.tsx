import React, { Component } from 'react';
import {
  Divider, Grid, GridColumn, Rail, Responsive, Segment,
} from 'semantic-ui-react';
import { PullToRefresh } from '../../components';
import { Navigation } from '../../components/navigation';
import {
  CreatePost, GoalProgress, LeftRail, RightRail,
} from './components';
import { GetPostsResult } from './queries';
import { RepoList } from './RepoList';

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
      mainElement: 'body',
      onRefresh() {
        window.location.reload();
      },
      shouldPullToRefresh() {
        try {
          return document.getElementsByClassName('page')[0].scrollTop === 0;
        } catch (error) {
          return true;
        }
      },
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="page">
          <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
            <div style={{ padding: '1em' }}>
              <GoalProgress />
              <Divider />
              <CreatePost back={false} />
            </div>
            <Divider style={{ marginBottom: '2px', marginTop: '0px' }} />
            <RepoList />
          </Responsive>
          <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <Grid centered columns={1} style={{ minHeight: '57em' }}>
              <GridColumn style={{ padding: 0, maxWidth: '420px' }}>
                <Segment style={{ maxWidth: '420px', margin: 'auto' }}>
                  <CreatePost back={false} />
                </Segment>
                <div
                  style={{
                    marginTop: '18px',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <RepoList data-testid="repo-list" />
                </div>
                <Rail attached position="left" style={{ marginRight: '22px' }}>
                  <LeftRail data-testid="left-rail" />
                </Rail>
                <Rail attached position="right">
                  <RightRail data-testid="right-rail" />
                </Rail>
              </GridColumn>
            </Grid>
          </Responsive>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default FeedPage;
