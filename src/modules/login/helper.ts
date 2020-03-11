import settings from "../../config/settings";

export interface LoginSuccessParams {
    token: string;
    user: {
        id: string
    }
}

export const loginSuccess = (data: LoginSuccessParams) => {
    localStorage.setItem(settings.LOCALSTORAGE_TOKEN, data.token);
    localStorage.setItem(settings.USER_ID_TOKEN, data.user.id);
};
