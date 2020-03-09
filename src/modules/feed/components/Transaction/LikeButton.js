import React, { Component } from "react";
import { Button, Icon, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import enhanceWithClickOutside from "react-click-outside";

import settings from "../../../../config/settings";
import {
  GET_POSTS,
  FRAGMENT_POST,
  GET_GOAL_PERCENTAGE,
} from "../../queries";

const userId = localStorage.getItem(settings.USER_ID_TOKEN);
const teamId = localStorage.getItem(settings.TEAM_ID_TOKEN);

export const MUTATION_TOGGLE_LIKE = gql`
  mutation ToggleLikePost($id: ID!) {
    toggleLikePost(postId: $id) {
      post {
        ...PostInFeed
      }
    }
  }
  ${FRAGMENT_POST}
`;

const updateState = (store, newData) => {
  const beforeState = store.readQuery({
    query: GET_POSTS,
    variables: { team_id: teamId },
  });
  const afterState = {
    ...beforeState,
    posts: {
      edges: beforeState.teamById.posts.edges.map(post => {
        if (post.id !== newData.id) {
          return post;
        }

        return newData;
      }),
    },
  };

  store.writeQuery({
    query: GET_POSTS,
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
        post: {
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
        __typename: "ToggleLikePostMutationPayload",
      },
    },
    update: (proxy, { data: { toggleLikePost } }) =>
      updateState(proxy, toggleLikePost),
  });
};

class LikeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLikes: false,
    };

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  handleClickOutside() {
    this.hide();
  }

  hide() {
    this.setState({ showLikes: false });
  }

  show() {
    this.setState({ showLikes: true });
  }

  render() {
    const { transactionId, liked, post } = this.props;

    const allLikes = post.votes.length
      ? post.votes.map(item => item.voter.name).join(", ")
      : "No likes";
    let message = "";

    if (post.votes.length) {
      message += `+${post.votes.length}₭ by ${
        liked ? "you" : post.votes[0].voter.name
      }`;
    }

    if (post.votes.length > 1) {
      message += ` and ${post.votes.length - 1} other${
        post.votes.length - 1 > 1 ? "s" : ""
      }. `;
    }

    return (
      <div
        style={{
          width: "95%",
          display: "flex",
          alignItems: "center",
        }}
        data-testid="post-like-button"
      >
        <div style={{ display: "flex" }}>
          <Mutation
            mutation={MUTATION_TOGGLE_LIKE}
            update={(cache, { data: { toggleLikePost } }) =>
              updateState(cache, toggleLikePost)
            }
            refetchQueries={[
              {
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                },
              },
            ]}
          >
            {mutate => (
              <Button
                basic
                icon
                size="mini"
                onClick={() => toggleLike(mutate, transactionId, post)}
                labelPosition="left"
              >
                <Icon
                  name={liked ? "thumbs up" : "thumbs up outline"}
                  color={liked ? "blue" : null}
                />
                <p>+1₭</p>
              </Button>
            )}
          </Mutation>
        </div>
        <p
          style={{ margin: "auto", marginLeft: "4px", width: "auto" }}
          onClick={this.show}
          data-testid="post-voters-message"
        >
          {message}
        </p>
        {this.state.showLikes && (
          <Segment
            style={{
              position: "absolute",
              zIndex: "1",
              top: "100px",
              left: "102px",
            }}
          >
            {allLikes}
          </Segment>
        )}
      </div>
    );
  }
}

export default enhanceWithClickOutside(LikeButton);
