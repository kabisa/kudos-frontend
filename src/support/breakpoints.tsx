import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

const Desktop = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? <>{children}</> : null;
};

const TabletAndBelow = ({ children }: { children: ReactNode }) => {
  const isTabletAndBelow = useMediaQuery({ maxWidth: 991 });
  return isTabletAndBelow ? <>{children}</> : null;
};

const Tablet = ({ children }: { children: ReactNode }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? <>{children}</> : null;
};

const TabletAndAbove = ({ children }: { children: ReactNode }) => {
  const isTabletAndAbove = useMediaQuery({ minWidth: 768 });
  return isTabletAndAbove ? <>{children}</> : null;
};

const MobileAndBelow = ({ children }: { children: ReactNode }) => {
  const isMobileAndBelow = useMediaQuery({ maxWidth: 767 });
  return isMobileAndBelow ? <>{children}</> : null;
};

const Mobile = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 767 });
  return isMobile ? <>{children}</> : null;
};

const MobileAndAbove = ({ children }: { children: ReactNode }) => {
  const isMobileAndAbove = useMediaQuery({ minWidth: 320 });
  return isMobileAndAbove ? <>{children}</> : null;
};

export {
  Desktop,
  Tablet,
  TabletAndBelow,
  TabletAndAbove,
  Mobile,
  MobileAndBelow,
  MobileAndAbove,
};
