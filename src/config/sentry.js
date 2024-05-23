import Settings from "./settings";
import Raven from "raven-js";

if (Settings.sentryDsn) {
  Raven.config(Settings.sentryDsn, {
    environment: process.env.NODE_ENV,
    release: process.env.REACT_APP_VERSION,
    tags: {
      revision: process.env.REACT_APP_GIT_SHA,
    },
  }).install();
} else {
  if (process.env.NODE_ENV === "production") {
    console.warn(`Sentry exception tracking is NOT enabled. Either add a 'sentryDsn' property
    in 'settings.production.json' or remove the Sentry import in index.js to silence this warning.`);
  }
}

export default Raven;
