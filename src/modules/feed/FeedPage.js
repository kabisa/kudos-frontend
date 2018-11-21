import { h, Component } from "preact";
import { graphql } from "react-apollo";
import { Button } from "semantic-ui-react";

import settings from "../../config/settings";
import { Navigation } from "../../components/navigation";
import {
  Transaction,
  GoalProgress,
  ActionButton,
  TransactionLoading,
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ActionButton />
        <div className="page">
          <GoalProgress />
          <RepoListWithQuery />
        </div>
        <Navigation />
      </div>
    );
  }
}

export default FeedPage;
