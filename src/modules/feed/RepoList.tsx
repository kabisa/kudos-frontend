import React from 'react';
import { Query } from '@apollo/react-components';
import { Icon } from 'semantic-ui-react';
import { GET_POSTS, GetPostsResult } from './queries';
import settings from '../../config/settings';
import { Transaction, TransactionLoading } from './components/Transaction';

export function RepoList(): React.ReactElement {
  return (
    <Query <GetPostsResult>
      query={GET_POSTS}
      variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
      fetchPolicy="network-only"
    >
      {({
        error, loading, data, fetchMore,
      }) => {
        function loadMore() {
          fetchMore({
            variables: {
              team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
              end: data?.teamById.posts.pageInfo.endCursor,
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
        }

        if (error) return <p>{error.message}</p>;
        if (loading || !data) {
          return (
            <div>
              <TransactionLoading />
              <TransactionLoading />
              <TransactionLoading />
              <TransactionLoading />
            </div>
          );
        }

        const { posts } = data.teamById;
        return (
          <div>
            {posts.edges.map((item) => (
              <Transaction transaction={item.node} key={item.node.id} />
            ))}
            {posts.pageInfo.hasNextPage && (
            <div data-testid="next-page-button" style={{ height: '120px', display: 'flex' }}>
              <Icon
                name="arrow down"
                size="large"
                onClick={() => loadMore()}
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
      }}

    </Query>
  );
}
