import React from "react";
import { Query } from "@apollo/client/react/components";
import { GET_POSTS, GetPostsResult } from "./queries";
import settings from "../../config/settings";
import { Transaction } from "./components/Transaction";
import { Storage } from "../../support/storage";
import s from "./RepoList.module.scss";
import { Icon } from "@sandercamp/ui-components";

export function RepoList(): React.ReactElement {
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
          <div>
            {posts.edges.map((item) => (
              <Transaction transaction={item.node} key={item.node.id} />
            ))}
            {posts.pageInfo.hasNextPage && (
              <div data-testid="next-page-button" className={s.arrow_container}>
                <Icon name="arrow_downward" onClick={() => loadMore()}></Icon>
              </div>
            )}
            {!posts.pageInfo.hasNextPage && (
              <div>
                <p className={s.end_message}>
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
