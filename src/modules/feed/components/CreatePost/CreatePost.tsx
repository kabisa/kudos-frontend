import { useApolloClient, useMutation } from "@apollo/client";
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
import { FragmentPostResult, User } from "../../queries";

import CREATE_POST from "../../../../graphql/mutations/createPost.graphql";
import { GET_GOAL_PERCENTAGE } from "../../../../graphql/queries/getGoalPercentage.graphql";
import { GET_POSTS } from "../../../../graphql/queries/getPosts.graphql";
import { Card } from "../../../../ui/Card";
import InputField from "../../../../ui/InputField";
import MessageBox from "../../../../ui/MessageBox";
import styles from "./CreatePost.module.css";
import { GET_USERS } from "../../../../graphql/queries/getUsers.graphql";

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

  const onCompleted = () => {
    toast.info("Post created successfully!");
    setState(() => initialState);
  };

  const [state, setState] = useState<CreatePostState>(initialState);
  const client = useApolloClient();

  const [createPost, { loading, error }] = useMutation<CreatePostParameters>(
    CREATE_POST,
    {
      onError: (error) =>
        setState((prev) => {
          return { ...prev, error: getGraphqlError(error) };
        }),
      onCompleted: onCompleted,
      update: (cache, { data: postData }: any) => {
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
        // ...
      },
      refetchQueries: [
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
      ],
    },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, createPost: any) => {
    e.preventDefault();

    setState((prev) => ({
      ...prev,
      amountError: false,
      receiversError: false,
      messageError: false,
      error: "",
    }));

    if (!state.amount) {
      setState((prev) => {
        return { ...prev, amountError: true, error: ERROR_AMOUNT_BLANK };
      });
      return;
    }

    if (state.receivers.length === 0) {
      setState((prev) => {
        return { ...prev, receiversError: true, error: ERROR_RECEIVERS_BLANK };
      });
      return;
    }

    if (state.message.length < settings.MIN_POST_MESSAGE_LENGTH) {
      if (state.message.length === 0) {
        setState((prev) => {
          return { ...prev, messageError: true, error: ERROR_MESSAGE_BLANK };
        });
        return;
      }
      setState((prev) => {
        return { ...prev, messageError: true, error: ERROR_MESSAGE_MIN_LENGTH };
      });
      return;
    }

    if (state.message.length > settings.MAX_POST_MESSAGE_LENGTH) {
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
        !state.receivers.some(
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
        message: state.message,
        kudos: state.amount,
        receivers: realReceivers,
        virtual_receivers: virtualReceivers,
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
        images: state.images,
      },
    });
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
    <Card
      content={
        <form
          onSubmit={(e) => onSubmit(e, createPost)}
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
            value={state.message}
            data-testid="message-input"
            label="message"
            elementType="textarea"
            placeholder="Enter your message"
            onChange={handleMessageInputChange}
          />
          {error && state.messageError}
          <span className={styles.note}>
            {settings.MAX_POST_MESSAGE_LENGTH - state.message?.length} chars
            left
          </span>

          <Label>
            Images
            <ImageUpload onChange={(images) => handleImagesSelected(images)} />
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

          {state.error && (
            <MessageBox
              variant="error"
              title="Couldn't create post"
              message={state.error}
            />
          )}
        </form>
      }
    />
  );
};
export default CreatePost;
