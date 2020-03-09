import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  Icon,
  Grid,
  Rail,
  Segment,
  Responsive,
  Divider, GridColumn,
} from "semantic-ui-react";
import { PullToRefresh } from "../../components";
import settings from "../../config/settings";
import { Navigation } from "../../components/navigation";
import {
  Transaction,
  TransactionLoading,
  LeftRail,
  RightRail,
  CreatePost,
  GoalProgress,
} from "./components";
import { GET_TRANSACTIONS } from "./queries";
import { auth } from "../../support";

const RepoList = ({ data: { loading, error, teamById, loadMore } }) => {
  if (error) return <p>Something went wrong.</p>;
  if (loading) {
    return (
      <div>
        <TransactionLoading />
        <TransactionLoading />
        <TransactionLoading />
        <TransactionLoading />
      </div>
    );
  }

  const posts = teamById.posts;
  return (
    <div>
      {posts.edges.map(item => (
        <Transaction transaction={item.node} key={item.node.id} />
      ))}
      {posts.pageInfo.hasNextPage && (
        <div style={{ height: "120px", display: "flex" }}>
          <Icon
            name="arrow down"
            size="large"
            onClick={() => loadMore()}
            style={{ margin: "auto" }}
          />
        </div>
      )}
      {!posts.pageInfo.hasNextPage && (
        <div>
          <p style={{ lineHeight: "60px", textAlign: "center" }}>
            You&apos;ve reached the end, congratulations!
          </p>
        </div>
      )}
    </div>
  );
};

export class FeedPage extends Component {
  constructor(props) {
    super(props);
    auth();
    PullToRefresh.init({
      mainElement: "body",
      onRefresh: function() {
        window.location.reload();
      },
      shouldPullToRefresh: function() {
        try {
          return document.getElementsByClassName("page")[0].scrollTop === 0;
        } catch (error) {
          return true;
        }
      },
    });
  }

  render() {
    const withQuery = graphql(GET_TRANSACTIONS, {
      options: {
        variables: { team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) },
        fetchPolicy: "network-only",
      },
      props: ({ data }) => ({
        data: {
          ...data,
          loadMore: () => {
            data.fetchMore({
              variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                end: data.teamById.posts.pageInfo.endCursor,
              },
              updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
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
      <div
        style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <div className="page">
          <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
            <div style={{ padding: "1em" }}>
              <GoalProgress />
              <Divider />
              <CreatePost />
            </div>
            <Divider style={{ marginBottom: "2px", marginTop: "0px" }} />
            <RepoListWithQuery />
          </Responsive>
          <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <Grid centered columns={1} style={{ minHeight: "57em" }}>
              <GridColumn style={{ padding: 0, maxWidth: "420px" }}>
                <Segment style={{ maxWidth: "420px", margin: "auto" }}>
                  <CreatePost />
                </Segment>
                <div
                  style={{
                    marginTop: "18px",
                    "WebkitOverflowScrolling": "touch",
                  }}
                >
                  <RepoListWithQuery />
                </div>
                <Rail attached position="left" style={{ marginRight: "22px" }}>
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
