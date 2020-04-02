export default {
  // App settings.
  defaultLocale: "en-US",

  // Backend settings.
  MIN_PASSWORD_LENGTH: 8,
  MIN_POST_MESSAGE_LENGTH: 4,
  MAX_POST_MESSAGE_LENGTH: 140,

  // Create react app ignores any env vars that are not prefixed with REACT_APP_
  // https://create-react-app.dev/docs/adding-custom-environment-variables/
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL
    : "http://localhost:3000",

  // localStorage settings.
  LOCALSTORAGE_TOKEN: "token",
  TEAM_ID_TOKEN: "team_id",
  USER_ID_TOKEN: "user_id",
  ROLE_TOKEN: "team_role"
};
