import React from "react";
import MobileNavigation from "./Mobile";
import Desktop from "./Desktop";
import { Desktop as DesktopBreakpoint, TabletAndBelow } from "../../support/breakpoints";

const Navigation = () => (
  <div>
    <TabletAndBelow>
      <MobileNavigation />
    </TabletAndBelow>
    <DesktopBreakpoint>
      <Desktop />
    </DesktopBreakpoint>
  </div>
);

export default Navigation;
