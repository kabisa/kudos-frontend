import settings from '../../config/settings';
import { Storage } from '../../support/storage';

export interface LoginSuccessParams {
  token: string;
  user: {
    id: string;
  };
}

export const loginSuccess = (data: LoginSuccessParams) => {
  Storage.setItem(settings.LOCALSTORAGE_TOKEN, data.token);
  Storage.setItem(settings.USER_ID_TOKEN, data.user.id);
};
