const envSpecificSettings = require(`./settings.${process.env.NODE_ENV}.js`)
  .default;
const defaults = require("./settings.default.js").default;

export default { ...defaults, ...envSpecificSettings };
