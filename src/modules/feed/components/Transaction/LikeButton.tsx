import React from 'react';
import {
  Button, Icon, Label, Popup,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import settings from '../../../../config/settings';
import {
  FRAGMENT_POST, FragmentPostResult, GET_GOAL_PERCENTAGE, GET_POSTS,
} from '../../queries';

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

export interface ToggleLikeResult {
  toggleLikePost: {
    post: FragmentPostResult;
  };
}

const updateState = (store: any, newData: FragmentPostResult) => {
  const beforeState = store.readQuery({
    query: GET_POSTS,
    variables: { team_id: teamId },
  });
  const afterState = {
    ...beforeState,
    posts: {
      edges: beforeState.teamById.posts.edges.map((post: FragmentPostResult) => {
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

export const toggleLike = (mutate: any, transactionId: string, post: FragmentPostResult) => {
  mutate({
    variables: { id: transactionId },
    optimisticResponse: {
      __typename: 'Mutation',
      toggleLikePost: {
        post: {
          ...post,
          __typename: 'Post',
          votes: post.votes.some((vote) => vote.voter.id === userId)
            ? [...post.votes]
            : [
              ...post.votes,
              {
                voter: {
                  id: userId,
                  name: 'You',
                  __typename: 'User',
                },
                __typename: 'Vote',
              },
            ],
        },
        __typename: 'ToggleLikePostMutationPayload',
      },
    },
    update: (proxy: any, { data: { toggleLikePost } }: any) => updateState(proxy, toggleLikePost),
  });
};

export interface LikeButtonProps {
  transactionId: string;
  liked: boolean;
  likes: number;
  post: FragmentPostResult;
}

export interface LikeButtonState {
  showLikes: boolean;
}

function LikeButton(props: LikeButtonProps) {
  const { transactionId, liked, post } = props;

  const allLikes = post.votes.length ? post.votes.map((item) => item.voter.name).join(', ') : 'No likes';

  return (
    <div
      style={{
        width: '95%',
        display: 'flex',
        alignItems: 'center',
      }}
      data-testid="post-like-button"
    >
      <div style={{ display: 'flex' }}>
        <Mutation<any>
          mutation={MUTATION_TOGGLE_LIKE}
          update={(cache, { data: { toggleLikePost } }) => updateState(cache, toggleLikePost)}
          refetchQueries={[
            {
              query: GET_GOAL_PERCENTAGE,
              variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
          ]}
        >
          {(mutate) => (
            <Popup
              trigger={(
                <Button as="div" labelPosition="right">
                  <Button
                    basic
                    icon
                    size="mini"
                    onClick={() => toggleLike(mutate, transactionId, post)}
                    labelPosition="left"
                  >
                    <Icon
                      name={liked ? 'thumbs up' : 'thumbs up outline'}
                      color={liked ? 'blue' : undefined}
                    />
                    <p>+1₭</p>
                  </Button>
                  <Label as="a" basic pointing="left">
                    {post.votes.length}
                  </Label>
                </Button>
                    )}
              content={(
                <p>{allLikes}</p>
                    )}
            />
          )}
        </Mutation>
      </div>
    </div>
  );
}

export default LikeButton;
