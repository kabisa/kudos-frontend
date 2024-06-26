import { Component, createRef, FormEvent, RefObject } from "react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import { gql } from "@apollo/client";
import { ApolloConsumer } from "@apollo/client";
import type { ApolloClient } from "@apollo/client";
import { Button, Label } from "@kabisa/ui-components";

import settings from "../../../../config/settings";
import UserDropdown, { NameOption } from "../UserDropdown/UserDropdown";
import GuidelineInput from "../GuidelineInput/GuidelineInput";

import {
  ERROR_AMOUNT_BLANK,
  ERROR_MESSAGE_BLANK,
  ERROR_MESSAGE_MAX_LENGTH,
  ERROR_MESSAGE_MIN_LENGTH,
  ERROR_RECEIVERS_BLANK,
  getGraphqlError,
} from "../../../../support";
import {
  FragmentPostResult,
  GET_GOAL_PERCENTAGE,
  GET_POSTS,
  GET_USERS,
  User,
} from "../../queries";
import { Storage } from "../../../../support/storage";
import { ImageUpload } from "../../../../components/upload/ImageUpload";

import styles from "./CreatePost.module.css";
import MessageBox from "../../../../ui/MessageBox";
import { Card } from "../../../../ui/Card";

// eslint-disable-next-line max-len
export const CREATE_POST = gql`
  mutation CreatePost(
    $message: String
    $kudos: Int
    $receivers: [ID!]
    $virtual_receivers: [String!]
    $team_id: ID
    $images: [UploadedFile!]!
  ) {
    createPost(
      message: $message
      amount: $kudos
      receiverIds: $receivers
      nullReceivers: $virtual_receivers
      teamId: $team_id
      images: $images
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
  amount?: number;
  receivers: readonly NameOption[];
  message: string;
  images?: File[];
  amountError: boolean;
  receiversError: boolean;
  messageError: boolean;
  error: string;
}

export class CreatePost extends Component<CreatePostProps, CreatePostState> {
  initialState: CreatePostState;

  // @ts-ignore
  guidelineInput: RefObject<GuidelineInput>;

  // @ts-ignore
  userDropdown: RefObject<UserDropdown>;

  // @ts-ignore
  imageUpload: RefObject<ImageUpload>;

  // @ts-ignore
  private _isMounted: boolean;

  constructor(props: CreatePostProps) {
    super(props);
    this.guidelineInput = createRef();
    this.userDropdown = createRef();
    this.imageUpload = createRef();

    this.state = {
      amount: undefined,
      receivers: [],
      message: "",
      images: [],
      amountError: false,
      receiversError: false,
      messageError: false,
      error: "",
    };

    this.initialState = this.state;

    if (props.transaction) {
      this.setState({
        message: props.transaction.message,
        amount: props.transaction.amount,
        // @ts-ignore
        receivers: props.transaction.receivers,
      });
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleKudoInputChange = this.handleKudoInputChange.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  onSubmit(
    e: FormEvent<HTMLFormElement>,
    createPost: any,
    client: ApolloClient<any>,
  ) {
    e.preventDefault();

    const { amount, receivers, message, images } = this.state;
    this.setState({
      amountError: false,
      receiversError: false,
      messageError: false,
      error: "",
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
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
    }).teamById;

    const realReceivers: string[] = [];
    const virtualReceivers: string[] = [];

    users.forEach((user: User) => {
      if (
        !receivers.some(
          (receiver) =>
            receiver.label === user.name ||
            (user.virtualUser && receiver.value === user.id),
        )
      )
        return;

      if (user.virtualUser) {
        virtualReceivers.push(user.name);
      } else {
        realReceivers.push(user.id);
      }
    });

    createPost({
      variables: {
        message,
        kudos: amount,
        images,
        receivers: realReceivers,
        virtual_receivers: virtualReceivers,
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  onCompleted() {
    toast.info("Post created successfully!");
    // We use wrapped instance because enhanceWithClickOutside wraps the component.
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    this.guidelineInput.current.__wrappedInstance.resetState();
    // @ts-ignore
    this.userDropdown.current.resetState();
    this.imageUpload.current.resetState();
    this.setState(this.initialState);
  }

  handleDropdownChange(values: readonly NameOption[]) {
    if (!values) {
      this.setState({ receivers: [] });
      return;
    }
    this.setState({ receivers: values });
  }

  handleKudoInputChange(amount: number) {
    this.setState({ amount });
  }

  handleImagesSelected(images: File[]) {
    this.setState({
      images,
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { amountError, receiversError, messageError } = this.state;
    const { transaction } = this.props;
    return (
      <ApolloConsumer>
        {(client) => (
          <Mutation<CreatePostParameters>
            mutation={CREATE_POST}
            onError={(error) => {
              if (this._isMounted) {
                this.setState({ error: getGraphqlError(error) });
              }
            }}
            onCompleted={this.onCompleted}
            update={(cache, { data: postData }: any) => {
              const beforeState: any = cache.readQuery({
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
                },
              });
              const afterState = {
                ...beforeState,
                teamById: {
                  ...beforeState.teamById,
                  activeKudosMeter: {
                    ...beforeState.teamById.activeKudosMeter,
                    amount:
                      beforeState.teamById.activeKudosMeter.amount +
                      postData?.createPost.amount,
                  },
                },
              };
              cache.writeQuery({
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
                },
                data: afterState,
              });
            }}
            refetchQueries={[
              {
                query: GET_GOAL_PERCENTAGE,
                variables: {
                  team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
                },
              },
              {
                query: GET_POSTS,
                variables: {
                  team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
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
                <Card
                  content={
                    <form
                      onSubmit={(e) => this.onSubmit(e, createPost, client)}
                      className={styles.form}
                      data-testid="create-post-form"
                    >
                      <GuidelineInput
                        data-testid="amount-input"
                        amountError={amountError}
                        handleChange={this.handleKudoInputChange}
                        ref={this.guidelineInput}
                      />
                      <Label>
                        Receivers
                        {/* Suppressed because the linter doesn't pick up on custom controls */}
                        <UserDropdown
                          data-testid="receiver-input"
                          ref={this.userDropdown}
                          onChange={this.handleDropdownChange}
                          error={receiversError}
                        />
                        <span className={styles.note}>(v) = virtual user</span>
                      </Label>

                      <Label>
                        Message
                        <textarea
                          data-testid="message-input"
                          placeholder="Enter your message"
                          name="message"
                          onChange={(e) =>
                            this.setState({ message: e.currentTarget.value })
                          }
                          value={this.state.message}
                        />
                        {error && messageError}
                        <span className={styles.note}>
                          {settings.MAX_POST_MESSAGE_LENGTH -
                            this.state.message.length}{" "}
                          chars left
                        </span>
                      </Label>

                      <Label>
                        Images
                        <ImageUpload
                          ref={this.imageUpload}
                          onChange={(images) =>
                            this.handleImagesSelected(images)
                          }
                        />
                      </Label>

                      <Button
                        className={styles.button}
                        data-testid="submit-button"
                        type="submit"
                        variant="primary"
                        disabled={loading}
                      >
                        {transaction ? "Update" : "DROP YOUR KUDOS HERE"}
                      </Button>

                      {displayError && (
                        <MessageBox
                          variant="error"
                          title="Couldn't create post"
                          message={displayError}
                        />
                      )}
                    </form>
                  }
                />
              );
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default CreatePost;
