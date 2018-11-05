import { h } from "preact";
import { Responsive } from "semantic-ui-react";
import MobileNavigation from "./Mobile";
import Desktop from "./Desktop";

export default () => (
  <div>
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <MobileNavigation />
    </Responsive>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Desktop />
    </Responsive>
  </div>
);
