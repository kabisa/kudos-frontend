import React from "react";
import MobileNavigation from "./Mobile";
import Desktop from "./Desktop";
import { Media } from "../../support/breakpoints";

const Navigation = () => (
  <div>
    <Media lessThan="computer">
      <MobileNavigation />
    </Media>
    <Media greaterThanOrEqual="computer">
      <Desktop />
    </Media>
  </div>
);

export default Navigation;
