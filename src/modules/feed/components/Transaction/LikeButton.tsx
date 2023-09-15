import { Component } from "react";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import classNames from 'classnames';
import { Icon } from "@sandercamp/ui-components";

import enhanceWithClickOutside from "react-click-outside";
import settings from "../../../../config/settings";
import {
  FRAGMENT_POST,
  FragmentPostResult,
  GET_GOAL_PERCENTAGE,
  GET_POSTS,
} from "../../queries";
import { Storage } from "../../../../support/storage";

import s from "./LikeButton.module.scss";


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

export interface ToggleLikeResult {
  toggleLikePost: {
    post: FragmentPostResult;
  };
}

const updateState = (store: any, newData: FragmentPostResult) => {
  let beforeState;

  const teamId = Storage.getItem(settings.TEAM_ID_TOKEN);

  try {
    beforeState = store.readQuery({
      query: GET_POSTS,
      variables: { team_id: teamId },
    });
  } catch (error) {
    // This is just to silence the error in the tests
    return;
  }

  const afterState = {
    ...beforeState,
    posts: {
      edges: beforeState.teamById.posts.edges.map(
        (post: FragmentPostResult) => {
          if (post.id !== newData.id) {
            return post;
          }

          return newData;
        },
      ),
    },
  };

  store.writeQuery({
    query: GET_POSTS,
    variables: { team_id: teamId },
    data: afterState,
  });
};

export const toggleLike = (
  mutate: any,
  transactionId: string,
  post: FragmentPostResult,
) => {
  const userId = Storage.getItem(settings.USER_ID_TOKEN);
  mutate({
    variables: { id: transactionId },
    optimisticResponse: {
      __typename: "Mutation",
      toggleLikePost: {
        post: {
          ...post,
          __typename: "Post",
          votes: post.votes.some((vote) => vote.voter.id === userId)
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
    update: (proxy: any, { data: { toggleLikePost } }: any) =>
      updateState(proxy, toggleLikePost),
  });
};

export interface LikeButtonProps {
  liked: boolean;
  post: FragmentPostResult;
}

export interface LikeButtonState {
  showLikes: boolean;
}

class LikeButton extends Component<LikeButtonProps, LikeButtonState> {
  constructor(props: LikeButtonProps) {
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
    const { liked, post } = this.props;

    const allLikes = post.votes.length
      ? post.votes.map((item) => item.voter.name).join(", ")
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
      <div className={s.container} data-testid="post-like-button">
        <div>
          <Mutation<any>
            mutation={MUTATION_TOGGLE_LIKE}
            update={(cache, { data: { toggleLikePost } }) =>
              updateState(cache, toggleLikePost)
            }
            refetchQueries={[
              {
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
                },
              },
            ]}
          >
            {(mutate) => (
              <button
                  className={ s.buttonContainer }
                  onClick={() => toggleLike(mutate, post.id, post)}
              >
                <Icon
                  className={ classNames([
                    liked ? "material-symbols-rounded" : "material-symbols-rounded-outlined",
                    s.button
                  ] ) }
                  name="thumb_up"
                  data-testid="like-button"
                />


                {/*{liked ? (*/}
                {/*  <Icon className="material-symbols-rounded" name="thumb_up" />*/}
                {/*) : (*/}
                {/*  <Icon*/}
                {/*    className="material-symbols-rounded-outlined"*/}
                {/*    name="thumb_up"*/}
                {/*  />*/}
                {/*)}*/}
                <span>+1₭</span>
              </button>
            )}
          </Mutation>
        </div>
        <p className={s.likes} onClick={this.show} data-testid="message">
          { message }
          {this.state.showLikes && (
              <div className={s.all_likes_container}>{allLikes}</div>
          )}
        </p>
      </div>
    );
  }
}

export default enhanceWithClickOutside(LikeButton);
