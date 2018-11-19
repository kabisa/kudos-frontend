import { h } from "preact";
import { Button, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import settings from "../../../../config/settings";
import { GET_TRANSACTIONS, FRAGMENT_POST } from "../../queries";

const userId = localStorage.getItem(settings.USER_ID_TOKEN);

export const MUTATION_TOGGLE_LIKE = gql`
  mutation ToggleLikePost($id: ID!) {
    toggleLikePost(post_id: $id) {
      ...PostInFeed
    }
  }
  ${FRAGMENT_POST}
`;

export const LikeButton = ({ transactionId, liked, likes, post }) => (
  <Mutation
    mutation={MUTATION_TOGGLE_LIKE}
    update={(cache, { data: { toggleLikePost } }) => {
      const beforeState = cache.readQuery({
        query: GET_TRANSACTIONS,
      });
      const afterState = {
        ...beforeState,
        postsConnections: {
          edges: beforeState.postsConnection.edges.map(post => {
            if (post.id !== toggleLikePost.id) {
              return post;
            }

            return {
              ...post,
              ...toggleLikePost,
            };
          }),
        },
      };

      cache.writeQuery({
        query: GET_TRANSACTIONS,
        data: afterState,
      });
    }}
  >
    {mutate => (
      <Button
        size="mini"
        basic
        // loading={loading}
        className="button-action"
        onClick={() =>
          mutate({
            variables: { id: transactionId },
            optimisticResponse: {
              __typename: "Mutation",
              toggleLikePost: {
                ...post,
                __typename: "Post",
                votes: post.votes.some(vote => vote.voter_id === userId)
                  ? [...post.votes]
                  : [
                      ...post.votes,
                      {
                        voter_id: userId,
                        __typename: "Vote",
                      },
                    ],
              },
            },
            update: (proxy, { data: { toggleLikePost } }) => {
              const beforeState = proxy.readQuery({
                query: GET_TRANSACTIONS,
              });
              const afterState = {
                ...beforeState,
                postsConnections: {
                  edges: beforeState.postsConnection.edges.map(post => {
                    if (post.id !== toggleLikePost.id) {
                      return post;
                    }

                    return toggleLikePost;
                  }),
                },
              };

              proxy.writeQuery({
                query: GET_TRANSACTIONS,
                data: afterState,
              });
            },
          })
        }
      >
        {/* {!loading && ( */}
        <Icon
          name={liked ? "heart" : "heart outline"}
          color={liked ? "red" : null}
        />
        {/* )} */}
        {likes}
      </Button>
    )}
  </Mutation>
);

export default LikeButton;
