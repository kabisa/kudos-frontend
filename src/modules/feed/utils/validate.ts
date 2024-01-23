import { ErrorState } from "../../../common/hooks/useFormValidation";
import settings from "../../../config/settings";
import {
  ERROR_AMOUNT_BLANK,
  ERROR_MESSAGE_BLANK,
  ERROR_MESSAGE_MAX_LENGTH,
  ERROR_MESSAGE_MIN_LENGTH,
  ERROR_RECEIVERS_BLANK,
} from "../../../support";
import { CreatePostState } from "../components/CreatePost/CreatePost";

export const validate = (state: CreatePostState): ErrorState => {
  const errors = [];
  // Your validation logic here
  if (!state.amount) {
    errors.push(ERROR_AMOUNT_BLANK);
  }

  if (state.receivers.length === 0) {
    errors.push(ERROR_RECEIVERS_BLANK);
  }

  if (state.message.length < settings.MIN_POST_MESSAGE_LENGTH) {
    if (state.message.length === 0) {
      errors.push(ERROR_MESSAGE_BLANK);
    }
    errors.push(ERROR_MESSAGE_MIN_LENGTH);
  }

  if (state.message.length > settings.MAX_POST_MESSAGE_LENGTH) {
    errors.push(ERROR_MESSAGE_MAX_LENGTH);
  }
  console.log(errors);
  return { errors: errors };
};
