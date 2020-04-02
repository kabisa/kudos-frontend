import React, { Component, FormEvent } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import gql from 'graphql-tag';
import { ApolloConsumer } from '@apollo/react-common';
import ApolloClient from 'apollo-client';
import settings from '../../../config/settings';
import UserDropdown from './UserDropdown/UserDropdown';
import GuidelineInput from './GuidelineInput/GuidelineInput';
import { PATH_FEED } from '../../../routes';
import {
  ERROR_AMOUNT_BLANK,
  ERROR_MESSAGE_BLANK,
  ERROR_MESSAGE_MAX_LENGTH,
  ERROR_MESSAGE_MIN_LENGTH,
  ERROR_RECEIVERS_BLANK,
  getGraphqlError,
} from '../../../support';
import BackButton from '../../login/BackButton';
import {
  FragmentPostResult, GET_GOAL_PERCENTAGE, GET_POSTS, GET_USERS, User,
} from '../queries';

import s from '../FeedPage.module.scss';

export const CREATE_POST = gql`
    mutation CreatePost($message: String, $kudos: Int, $receivers: [ID!], $virtual_receivers: [String!], $team_id: ID) {
        createPost(
            message: $message
            amount: $kudos
            receiverIds: $receivers
            nullReceivers: $virtual_receivers
            teamId: $team_id
        ) {
            post {
                id
                amount
            }
        }
    }
`;

export interface CreatePostParameters {
  message: string;
  kudos: number;
  receivers: string[];
  virtual_receivers: string[];
  team_id: string;
}

export interface CreatePostProps {
  transaction?: FragmentPostResult;
  back: boolean;
}

export interface CreatePostState {
  amount: string;
  receivers: string[];
  message: string;
  amountError: boolean;
  receiversError: boolean;
  messageError: boolean;
  error: string;
}

export class CreatePost extends Component<CreatePostProps, CreatePostState> {
  initialState: CreatePostState;

  // @ts-ignore
  guidelineInput?: GuidelineInput;

  // @ts-ignore
  userDropdown?: UserDropdown;

  constructor(props: CreatePostProps) {
    super(props);

    this.state = {
      amount: '',
      receivers: [],
      message: '',
      amountError: false,
      receiversError: false,
      messageError: false,
      error: '',
    };

    this.initialState = this.state;

    if (props.transaction) {
      this.setState({
        message: props.transaction.message,
        amount: String(props.transaction.amount),
        // @ts-ignore
        receivers: props.transaction.receivers,
      });
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleKudoInputChange = this.handleKudoInputChange.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  onSubmit(createPost: any, client: ApolloClient<any>) {
    const { amount, receivers, message } = this.state;
    this.setState({
      amountError: false,
      receiversError: false,
      messageError: false,
      error: '',
    });

    if (!amount) {
      this.setState({
        amountError: true,
        error: ERROR_AMOUNT_BLANK,
      });
      return;
    }

    if (receivers.length === 0) {
      this.setState({
        receiversError: true,
        error: ERROR_RECEIVERS_BLANK,
      });
      return;
    }

    if (message.length < settings.MIN_POST_MESSAGE_LENGTH) {
      if (message.length === 0) {
        this.setState({ messageError: true, error: ERROR_MESSAGE_BLANK });
        return;
      }
      this.setState({
        messageError: true,
        error: ERROR_MESSAGE_MIN_LENGTH,
      });
      return;
    }

    if (message.length > settings.MAX_POST_MESSAGE_LENGTH) {
      this.setState({
        messageError: true,
        error: ERROR_MESSAGE_MAX_LENGTH,
      });
      return;
    }

    const { users } = client.readQuery({
      query: GET_USERS,
      variables: {
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    }).teamById;

    const realReceivers: string[] = [];
    const virtualReceivers: string[] = [];

    users.forEach((user: User) => {
      if (!receivers.includes(user.id)) return;

      if (user.virtualUser) {
        virtualReceivers.push(user.name);
      } else {
        realReceivers.push(user.id);
      }
    });

    createPost({
      variables: {
        message,
        kudos: Number(amount),
        receivers: realReceivers,
        virtual_receivers: virtualReceivers,
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  onCompleted() {
    toast.info('Post created successfully!');
    // @ts-ignore
    this.guidelineInput.resetState();
    // @ts-ignore
    this.userDropdown.resetState();
    this.setState(this.initialState);
    return <Redirect to={PATH_FEED} />;
  }

  handleDropdownChange(value: string[]) {
    if (!value) {
      this.setState({ receivers: [] });
      return;
    }
    this.setState({ receivers: value });
  }

  handleKudoInputChange(amount: string) {
    this.setState({ amount });
  }

  handleChange(e: FormEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  render() {
    const { amountError, receiversError, messageError } = this.state;
    const { transaction } = this.props;
    return (
      <ApolloConsumer>
        {(client) => (
          <Mutation<CreatePostParameters>
            mutation={CREATE_POST}
            onCompleted={this.onCompleted}
            onError={(error) => this.setState({ error: error.message })}
            update={(cache, { data: postData }: any) => {
              const beforeState: any = cache.readQuery({
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                },
              });
              const afterState = {
                ...beforeState,
                teamById: {
                  ...beforeState.teamById,
                  activeKudosMeter: {
                    ...beforeState.teamById.activeKudosMeter,
                    amount: beforeState.teamById.activeKudosMeter.amount + postData?.createPost.amount,
                  },
                },
              };
              cache.writeQuery({
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                },
                data: afterState,
              });
            }}
            refetchQueries={[
              {
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                },
              },
              {
                query: GET_POSTS,
                variables: {
                  team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                },
              },
            ]}
          >
            {(createPost, { loading, error }) => {
              let displayError;
              if (error) {
                displayError = getGraphqlError(error);
              }
              if (this.state.error) {
                displayError = this.state.error;
              }
              return (
                <Form
                  onSubmit={() => this.onSubmit(createPost, client)}
                  className={s.form}
                  data-testid="create-post-form"
                >
                  <GuidelineInput
                    data-testid="amount-input"
                    amountError={amountError}
                    handleChange={this.handleKudoInputChange}
                    ref={(c) => {
                      this.guidelineInput = c || undefined;
                    }}
                  />
                  <Form.Field>
                    {/* Suppressed because the linter doesn't pick up on custom controls */}
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="input-receivers">
                      Receivers
                      <UserDropdown
                        data-testid="receiver-input"
                        ref={(c) => {
                          this.userDropdown = c || undefined;
                        }}
                        id="input-receivers"
                        onChange={this.handleDropdownChange}
                        error={receiversError}
                        value={this.state.receivers}
                      />
                    </label>
                  </Form.Field>

                  <Form.TextArea
                    data-testid="message-input"
                    label="Message"
                    placeholder="Enter your message"
                    name="message"
                    onChange={this.handleChange}
                    error={messageError}
                    value={this.state.message}
                  />

                  <Button
                    data-testid="submit-button"
                    type="submit"
                    primary
                    className={s.submit_button}
                    loading={loading}
                    disabled={loading}
                  >
                    {transaction ? 'Update' : 'Create'}
                  </Button>

                  {displayError && (
                  <Message negative>
                    <Message.Header>Couldn&apos;t create post</Message.Header>
                    <p data-testid="error-message">{displayError}</p>
                  </Message>
                  )}
                  {this.props.back && <BackButton />}
                </Form>
              );
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default CreatePost;
