import { createMedia } from "@artsy/fresnel";

export const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeMonitor: 1200,
    widescreen: 1920,
  },
});
