import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {
  Divider, Grid, GridColumn, Icon, Rail, Responsive, Segment,
} from 'semantic-ui-react';
import { PullToRefresh } from '../../components';
import settings from '../../config/settings';
import { Navigation } from '../../components/navigation';
import {
  CreatePost, GoalProgress, LeftRail, RightRail, Transaction, TransactionLoading,
} from './components';
import { GET_POSTS, GetPostsResult } from './queries';

export interface Props {
  data: {
    loading: boolean;
    error: object;

    // Query result
    teamById: GetPostsResult;
    loadMore: any;
  };
}

function RepoList(props: Props): React.ReactElement {
  if (props.data.error) return <p>Something went wrong.</p>;
  if (props.data.loading) {
    return (
      <div>
        <TransactionLoading />
        <TransactionLoading />
        <TransactionLoading />
        <TransactionLoading />
      </div>
    );
  }

  const { posts } = props.data.teamById;
  return (
    <div>
      {posts.edges.map((item) => (
        <Transaction transaction={item.node} key={item.node.id} />
      ))}
      {posts.pageInfo.hasNextPage && (
        <div style={{ height: '120px', display: 'flex' }}>
          <Icon
            name="arrow down"
            size="large"
            onClick={() => props.data.loadMore()}
            style={{ margin: 'auto' }}
          />
        </div>
      )}
      {!posts.pageInfo.hasNextPage && (
        <div>
          <p style={{ lineHeight: '60px', textAlign: 'center' }}>
            You&apos;ve reached the end, congratulations!
          </p>
        </div>
      )}
    </div>
  );
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
    const withQuery = graphql(GET_POSTS, {
      options: {
        variables: { team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) },
        fetchPolicy: 'network-only',
      },
      props: ({ data }: any) => ({
        data: {
          ...data,
          loadMore: () => {
            data.fetchMore({
              variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                end: data.teamById.posts.pageInfo.endCursor,
              },
              updateQuery: (previousResult: any = {}, { fetchMoreResult = {} }: any) => {
                const previousPosts = previousResult.teamById || {};
                const newPosts = fetchMoreResult.teamById || {};

                const previousEdges = previousPosts.posts.edges || [];
                const currentEdges = newPosts.posts.edges || [];

                return {
                  ...previousResult,
                  teamById: {
                    ...previousPosts,
                    posts: {
                      ...previousPosts.posts,
                      edges: [...previousEdges, ...currentEdges],
                      pageInfo: newPosts.posts.pageInfo,
                    },
                  },
                };
              },
            });
          },
        },
      }),
    });

    const RepoListWithQuery = withQuery(RepoList);

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
            <RepoListWithQuery />
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
                  <RepoListWithQuery />
                </div>
                <Rail attached position="left" style={{ marginRight: '22px' }}>
                  <LeftRail />
                </Rail>
                <Rail attached position="right">
                  <RightRail />
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
