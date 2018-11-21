import { h } from "preact";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import settings from "src/config/settings";
import { GET_TRANSACTIONS, FRAGMENT_POST } from "../../queries";

const userId = localStorage.getItem(settings.USER_ID_TOKEN);
const teamId = localStorage.getItem(settings.TEAM_ID_TOKEN);

export const MUTATION_TOGGLE_LIKE = gql`
  mutation ToggleLikePost($id: ID!) {
    toggleLikePost(post_id: $id) {
      ...PostInFeed
    }
  }
  ${FRAGMENT_POST}
`;

const updateState = (store, newData) => {
  const beforeState = store.readQuery({
    query: GET_TRANSACTIONS,
    variables: { team_id: teamId },
  });
  const afterState = {
    ...beforeState,
    postsConnections: {
      edges: beforeState.postsConnection.edges.map(post => {
        if (post.id !== newData.id) {
          return post;
        }

        return newData;
      }),
    },
  };

  store.writeQuery({
    query: GET_TRANSACTIONS,
    variables: { team_id: teamId },
    data: afterState,
  });
};

export const toggleLike = (mutate, transactionId, post) => {
  mutate({
    variables: { id: transactionId },
    optimisticResponse: {
      __typename: "Mutation",
      toggleLikePost: {
        ...post,
        __typename: "Post",
        votes: post.votes.some(vote => vote.voter.id === userId)
          ? [...post.votes]
          : [
              ...post.votes,
              {
                voter: {
                  id: userId,
                  name: "You",
                  __typename: "User",
                },
                __typename: "Vote",
              },
            ],
      },
    },
    update: (proxy, { data: { toggleLikePost } }) =>
      updateState(proxy, toggleLikePost),
  });
};

export const LikeButton = ({ transactionId, liked, likes, post }) => (
  <div>
    <Mutation
      mutation={MUTATION_TOGGLE_LIKE}
      update={(cache, { data: { toggleLikePost } }) =>
        updateState(cache, toggleLikePost)
      }
    >
      {mutate => (
        <Button
          size="mini"
          basic
          className="button-action"
          onClick={() => toggleLike(mutate, transactionId, post)}
        >
          <Icon
            name={liked ? "heart" : "heart outline"}
            color={liked ? "red" : null}
          />
          {likes}
        </Button>
      )}
    </Mutation>
    <Dropdown
      trigger={<p>View likes</p>}
      options={[
        {
          key: "1",
          text: post.votes.length
            ? post.votes.map(item => item.voter.name).join(", ")
            : "No likes",
        },
      ]}
      icon={null}
      basic
      item
      lazyLoad
    />
  </div>
);

export default LikeButton;
