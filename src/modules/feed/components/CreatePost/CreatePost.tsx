import { useApolloClient, useMutation } from "@apollo/client";
import { Button, Label } from "@kabisa/ui-components";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import settings from "../../../../config/settings";
import GuidelineInput from "../GuidelineInput/GuidelineInput";
import UserDropdown, { NameOption } from "../UserDropdown/UserDropdown";

import { ImageUpload } from "../../../../components/upload/ImageUpload";
import { getGraphqlError } from "../../../../support";
import { Storage } from "../../../../support/storage";
import { FragmentPostResult, User } from "../../queries";

import CREATE_POST from "../../../../common/graphql/mutations/createPost.graphql";
import { GET_GOAL_PERCENTAGE } from "../../../../common/graphql/queries/getGoalPercentage.graphql";
import { GET_POSTS } from "../../../../common/graphql/queries/getPosts.graphql";
import { GET_USERS } from "../../../../common/graphql/queries/getUsers.graphql";
import useFormValidation from "../../../../common/hooks/useFormValidation";
import { Card } from "../../../../ui/Card";
import InputField from "../../../../ui/InputField";
import MessageBox from "../../../../ui/MessageBox";
import { CreatePostState } from "../../types/CreatePostState";
import { validate } from "../../utils/validate";
import styles from "./CreatePost.module.css";

export type CreatePostParameters = {
  message: string;
  kudos: number;
  receivers: string[];
  virtual_receivers: string[];
  team_id: string;
};

export type CreatePostProps = {
  transaction?: FragmentPostResult;
  back: boolean;
};

const CreatePost = ({ transaction }: CreatePostProps) => {
  const initialState: CreatePostState = {
    amount: undefined,
    message: "",
    receivers: [],
    images: [],
  };

  const client = useApolloClient();
  const { state, errors, updateState } = useFormValidation<CreatePostState>(
    initialState,
    validate,
  );
  const [graphqlError, setGraphqlError] = useState("");
  const [showError, setShowError] = useState(false);

  const onCompleted = () => {
    toast.info("Post created successfully!");
    updateState(initialState);
  };

  const [createPost, { loading, error }] = useMutation<CreatePostParameters>(
    CREATE_POST,
    {
      onError: (error) => setGraphqlError(getGraphqlError(error)),
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

  useEffect(() => {
    setShowError(false);
  }, [state]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, createPost: any) => {
    e.preventDefault();
    if (errors.errors.length > 0) {
      setShowError(true);
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

    setShowError(false);
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

  const handleKudoInputChange = (amount: number) => {
    updateState({ ...state, amount: amount });
  };

  const handleImagesSelected = (images: File[]) => {
    updateState({ ...state, images: images });
  };

  const handleMessageInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateState({ ...state, message: event.target.value });
  };

  const onReceiverChange = (values: readonly NameOption[]) => {
    if (!values) {
      updateState({ ...state, receivers: [] });
    }
    updateState({ ...state, receivers: values });
  };

  const handleCreateUser = (inputValue: any) => {
    const oldState = client.readQuery({
      query: GET_USERS,
      variables: {
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
    });

    const existing = oldState.teamById.users.filter(
      (u: User) => u.name === inputValue,
    );

    if (existing.length > 0) {
      return;
    }

    let id = "-1";
    oldState.teamById.users.forEach((option: User) => {
      const itemId = Number.parseInt(option.id, 10);
      const numberId = Number.parseInt(id, 10);
      if (itemId >= numberId) {
        id = (itemId + 1).toString();
      }
    });

    const newState = {
      ...oldState,
      teamById: {
        ...oldState.teamById,
        users: [
          ...oldState.teamById.users,
          {
            id,
            name: inputValue,
            virtualUser: true,
            __typename: "User",
          },
        ],
      },
    };

    client.writeQuery({
      query: GET_USERS,
      variables: {
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
      data: newState,
    });

    updateState({
      ...state,
      receivers: [...state.receivers, { label: inputValue, value: id }],
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
            amountError={errors.errors.length > 0}
            handleChange={handleKudoInputChange}
          />
          <Label>
            Receivers
            <UserDropdown
              onChange={onReceiverChange}
              receivers={state.receivers}
              onCreate={handleCreateUser}
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
          {error && errors.errors.length > 0}
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

          {showError && (
            <MessageBox
              variant="error"
              title="Couldn't create post"
              message={errors.errors[0] || graphqlError}
            />
          )}
        </form>
      }
    />
  );
};
export default CreatePost;
