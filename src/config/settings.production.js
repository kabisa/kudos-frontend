// Create react app ignores any env vars that are not prefixed with REACT_APP_
// https://create-react-app.dev/docs/adding-custom-environment-variables/
export default {
  environment: "production",
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL
};
