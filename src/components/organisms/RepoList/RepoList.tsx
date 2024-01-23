import { Query } from "@apollo/client/react/components";
import { Icon, TileList } from "@kabisa/ui-components";

import { GetPostsResult } from "../../../modules/feed/queries";
import settings from "../../../config/settings";
import { Transaction } from "../../../modules/feed/components/Transaction";
import { Storage } from "../../../support/storage";

import s from "./RepoList.module.scss";
import { GET_POSTS } from "../../../graphql/queries/getPosts.graphql";

export function RepoList() {
  return (
    <Query<GetPostsResult>
      query={GET_POSTS}
      variables={{ team_id: Storage.getItem(settings.TEAM_ID_TOKEN) }}
      fetchPolicy="network-only"
    >
      {({ error, loading, data, fetchMore }) => {
        function loadMore() {
          fetchMore({
            variables: {
              team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
              end: data?.teamById.posts.pageInfo.endCursor,
            },
            updateQuery: (
              previousResult: any = {},
              { fetchMoreResult = {} }: any,
            ) => {
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
          return <div>Loading..</div>;
        }

        const { posts } = data.teamById;
        return (
          <div className={s.container}>
            <TileList className={s.tilesContainer}>
              {posts.edges.map((item) => (
                <Transaction
                  transaction={item.node}
                  key={item.node.id}
                  data-testid="kudo-transaction"
                />
              ))}
            </TileList>
            {posts.pageInfo.hasNextPage && (
              <button
                data-testid="next-page-button"
                className={s.arrowButton}
                onClick={() => loadMore()}
              >
                <Icon className={s.arrow} name="arrow_downward" />
              </button>
            )}
            {!posts.pageInfo.hasNextPage && (
              <p className={s.endMessage}>
                You&apos;ve reached the end, congratulations!
              </p>
            )}
          </div>
        );
      }}
    </Query>
  );
}
