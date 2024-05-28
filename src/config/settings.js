/* eslint-disable */

const envSpecificSettings = require(
  `./settings.${process.env.NODE_ENV}.js`,
).default;
const defaults = require("./settings.default.js").default;

export default { ...defaults, ...envSpecificSettings };

export function ON_MOBILE_DEVICE() {
  return (
    (window.cordova || window.PhoneGap || window.phonegap) &&
    /^file:\/{3}[^\/]/i.test(window.location.href) &&
    /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)
  );
}
