/* eslint-disable */

export default {
  // App settings.
  defaultLocale: "en-US",

  // Backend settings.
  MIN_PASSWORD_LENGTH: 8,
  MIN_POST_MESSAGE_LENGTH: 4,
  MAX_POST_MESSAGE_LENGTH: 140,

  // Network settings.
  API_BASE_URL: `${API_BASE_URL_ENV}`,
  API_BASE_URL_DEVELOP: `${API_BASE_URL_DEVELOP_ENV}`,
  API_BASE_URL_MASTER: `${API_BASE_URL_MASTER_ENV}`,

  // localStorage settings.
  LOCALSTORAGE_TOKEN: "token",
  TEAM_ID_TOKEN: "team_id",
  USER_ID_TOKEN: "user_id",
  ROLE_TOKEN: "team_role",
};
