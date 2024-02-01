import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.css";
import classNames from "classnames";
import { isDesktopQuery } from "../breakpoints";

export type NavigationProps = {
  children: (isDesktop: boolean) => React.ReactNode;
};

const Navigation = ({ children }: NavigationProps) => {
  const isDesktop = useMediaQuery({
    query: isDesktopQuery,
  });

  const navigationStyles = classNames(styles.navigation, {
    [styles.darkNavigationTheme]: isDesktop,
    [styles.lightNavigationTheme]: !isDesktop,
  });

  return (
    <nav className={navigationStyles}>
      <ul className={styles.list}>{children(isDesktop)}</ul>
    </nav>
  );
};

// Implement desktop/mobile navigation contents when implementing the logic container

export default Navigation;
