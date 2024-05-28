import { FC } from "react";
import MobileNavigation from "./Mobile";
import Desktop from "./Desktop";
import {
  Desktop as DesktopBreakpoint,
  TabletAndBelow,
} from "../../support/breakpoints";

type NavigationProps = {
  className?: string;
};

const Navigation: FC<NavigationProps> = ({ className }) => (
  <div className={className}>
    <TabletAndBelow>
      <MobileNavigation />
    </TabletAndBelow>
    <DesktopBreakpoint>
      <Desktop />
    </DesktopBreakpoint>
  </div>
);

export default Navigation;
