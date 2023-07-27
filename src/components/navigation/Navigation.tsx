import React from "react";
import MobileNavigation from "./Mobile";
import Desktop from "./Desktop";
import { Media } from "../../support/breakpoints";

export default () => (
  <div>
    <Media lessThan="computer">
      <MobileNavigation />
    </Media>
    <Media greaterThanOrEqual="computer">
      <Desktop />
    </Media>
  </div>
);
