/* eslint-disable */

import * as development from "./settings.development";
import * as production from "./settings.production";

export default {
  // App settings.
  defaultLocale: "en-US",

  // Backend settings.
  MIN_PASSWORD_LENGTH: 8,
  MIN_POST_MESSAGE_LENGTH: 4,
  MAX_POST_MESSAGE_LENGTH: 140,

  // Network settings.
  API_BASE_URL:
    process.env.NODE_ENV === "development"
      ? development.default.apiBaseUrl
      : production.default.apiBaseUrl,

  // localStorage settings.
  LOCALSTORAGE_TOKEN: "token",
  TEAM_ID_TOKEN: "team_id",
  USER_ID_TOKEN: "user_id",
  ROLE_TOKEN: "team_role",
};
