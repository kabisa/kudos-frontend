import { h } from "preact";
import { Button, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_TRANSACTIONS, FRAGMENT_POST } from "../../queries";

export const MUTATION_TOGGLE_LIKE = gql`
  mutation ToggleLikePost($id: ID!) {
    toggleLikePost(post_id: $id) {
      ...PostInFeed
    }
  }
  ${FRAGMENT_POST}
`;

export const LikeButton = ({ transactionId, liked, likes }) => (
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
    {(toggleLikePost, { loading }) => (
      <Button
        size="mini"
        basic
        loading={loading}
        className="button-action"
        onClick={() => toggleLikePost({ variables: { id: transactionId } })}
      >
        {!loading && (
          <Icon
            name={liked ? "heart" : "heart outline"}
            color={liked ? "red" : null}
          />
        )}
        {likes}
      </Button>
    )}
  </Mutation>
);

export default LikeButton;
