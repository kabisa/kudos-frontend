import { ApolloConsumer, gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import { Button, Label } from "@kabisa/ui-components";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

import settings from "../../../../config/settings";
import GuidelineInput from "../GuidelineInput/GuidelineInput";
import UserDropdown, { NameOption } from "../UserDropdown/UserDropdown";

import { ImageUpload } from "../../../../components/upload/ImageUpload";
import {
  ERROR_AMOUNT_BLANK,
  ERROR_MESSAGE_BLANK,
  ERROR_MESSAGE_MAX_LENGTH,
  ERROR_MESSAGE_MIN_LENGTH,
  ERROR_RECEIVERS_BLANK,
  getGraphqlError,
} from "../../../../support";
import { Storage } from "../../../../support/storage";
import {
  FragmentPostResult,
  GET_GOAL_PERCENTAGE,
  GET_POSTS,
  GET_USERS,
  User,
} from "../../queries";

import { Card } from "../../../../ui/Card";
import InputField from "../../../../ui/InputField";
import MessageBox from "../../../../ui/MessageBox";
import styles from "./CreatePost.module.css";

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

const CreatePost = ({ transaction }: CreatePostProps) => {
  const initialState: CreatePostState = {
    amount: undefined,
    receivers: [],
    message: "",
    images: [],
    amountError: false,
    receiversError: false,
    messageError: false,
    error: "",
  };

  const [state, setState] = useState<CreatePostState>(initialState);

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    createPost: any,
    client: any,
  ) => {
    e.preventDefault();

    const { amount, receivers, message, images } = state;
    setState({
      amountError: false,
      receiversError: false,
      messageError: false,
      error: "",
      receivers: [],
      message: "",
    });

    if (!amount) {
      setState((prev) => {
        return { ...prev, amountError: true, error: ERROR_AMOUNT_BLANK };
      });
      return;
    }

    if (receivers.length === 0) {
      setState((prev) => {
        return { ...prev, amountError: true, error: ERROR_RECEIVERS_BLANK };
      });
      return;
    }

    if (message.length < settings.MIN_POST_MESSAGE_LENGTH) {
      if (message.length === 0) {
        setState((prev) => {
          return { ...prev, amountError: true, error: ERROR_MESSAGE_BLANK };
        });
        return;
      }
      setState((prev) => {
        return { ...prev, messageError: true, error: ERROR_MESSAGE_MIN_LENGTH };
      });
      return;
    }

    if (message.length > settings.MAX_POST_MESSAGE_LENGTH) {
      setState((prev) => {
        return { ...prev, messageError: true, error: ERROR_MESSAGE_MAX_LENGTH };
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
  };

  const onCompleted = () => {
    toast.info("Post created successfully!");
    // if (guidelineInput.current) guidelineInput.resetState();
    // if (userDropdown.current) userDropdown.current.resetState();
    // if (imageUpload.current) imageUpload.current.resetState();
    // setState(initialState);
  };

  const handleDropdownChange = (values: readonly NameOption[]) => {
    if (!values) {
      setState((prev) => {
        return { ...prev, receivers: [] };
      });
      return;
    }
    setState((prev) => {
      return { ...prev, receivers: values };
    });
  };

  const handleKudoInputChange = (amount: number) => {
    setState((prev) => {
      return { ...prev, amount: amount };
    });
  };

  const handleImagesSelected = (images: File[]) => {
    setState((prev) => {
      return { ...prev, images: images };
    });
  };

  const handleMessageInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState((prev) => {
      return { ...prev, message: event.target.value };
    });
  };
  return (
    <ApolloConsumer>
      {(client) => (
        <Mutation<CreatePostParameters>
          mutation={CREATE_POST}
          onError={(error) =>
            setState((prev) => {
              return { ...prev, error: getGraphqlError(error) };
            })
          }
          onCompleted={onCompleted}
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
            if (state.error) {
              displayError = state.error;
            }
            return (
              <Card
                content={
                  <form
                    onSubmit={(e) => onSubmit(e, createPost, client)}
                    className={styles.form}
                    data-testid="create-post-form"
                  >
                    <GuidelineInput
                      data-testid="amount-input"
                      amountError={state.amountError}
                      handleChange={handleKudoInputChange}
                    />
                    <Label>
                      Receivers
                      {/* Suppressed because the linter doesn't pick up on custom controls */}
                      <UserDropdown
                        data-testid="receiver-input"
                        onChange={handleDropdownChange}
                        error={state.receiversError}
                        value={state.receivers}
                      />
                      <span className={styles.note}>(v) = virtual user</span>
                    </Label>

                    <InputField
                      id="message-input"
                      data-testid="message-input"
                      label="message"
                      elementType="textarea"
                      placeholder="Enter your message"
                      onChange={handleMessageInputChange}
                    />
                    {error && state.messageError}
                    <span className={styles.note}>
                      {settings.MAX_POST_MESSAGE_LENGTH - state.message?.length}{" "}
                      chars left
                    </span>

                    <Label>
                      Images
                      <ImageUpload
                        onChange={(images) => handleImagesSelected(images)}
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
};
export default CreatePost;
