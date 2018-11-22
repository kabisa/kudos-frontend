import { h, Component } from "preact";
import { graphql } from "react-apollo";
import { Button, Grid, Rail, Segment, Responsive } from "semantic-ui-react";

import settings from "../../config/settings";
import { Navigation } from "../../components/navigation";
import {
  Transaction,
  GoalProgress,
  ActionButton,
  TransactionLoading,
  LeftRail,
  RightRail,
  CreatePost,
} from "./components";
import { GET_TRANSACTIONS } from "./queries";
import { auth } from "../../support";

const RepoList = ({ data: { loading, error, postsConnection, loadMore } }) => {
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
  return (
    <div>
      {postsConnection.edges.map(item => (
        <Transaction transaction={item.node} key={item.id} />
      ))}
      {postsConnection.pageInfo.hasNextPage && (
        <Button
          loading={loading}
          size="huge"
          color="blue"
          fluid
          onClick={() => loadMore()}
        >
          Load more...
        </Button>
      )}
      {!postsConnection.pageInfo.hasNextPage && (
        <div>
          <p style={{ lineHeight: "60px" }}>
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
          loadMore: () =>
            data.fetchMore({
              variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                end: data.postsConnection.pageInfo.endCursor,
              },
              updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
                const previousPosts = previousResult.postsConnection || {};
                const newPosts = fetchMoreResult.postsConnection || {};
                const previousEdges = previousPosts.edges || [];
                const currentEdges = newPosts.edges || [];
                return {
                  ...previousResult,
                  postsConnection: {
                    ...previousPosts,
                    edges: [...previousEdges, ...currentEdges],
                    pageInfo: newPosts.pageInfo,
                  },
                };
              },
            }),
        },
      }),
    });

    const RepoListWithQuery = withQuery(RepoList);

    return (
      <div
        style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <ActionButton />
        <div className="page">
          <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
            <GoalProgress />
            <RepoListWithQuery />
          </Responsive>
          <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <Grid centered columns={3}>
              <Grid.Column style={{ padding: 0 }}>
                <Segment style={{ maxWidth: "420px", margin: "auto" }}>
                  <CreatePost />
                </Segment>
                <div style={{ marginTop: "18px" }}>
                  <RepoListWithQuery />
                </div>
                <Rail position="left">
                  <LeftRail />
                </Rail>
                <Rail position="right">
                  <RightRail />
                </Rail>
              </Grid.Column>
            </Grid>
          </Responsive>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default FeedPage;
