import classNames from "classnames";
import styles from "./Card.module.css";
import { ReactNode } from "react";

type CardHeaderProps = {
  theme?: "dark" | "light";
  center?: boolean;
  backgroundColor?: string;
  children?: ReactNode;
};

const CardHeader = ({
  theme = "light",
  center = false,
  children,
}: CardHeaderProps) => (
  <header
    className={classNames(styles.cardHeader, {
      [styles.dark]: theme == "dark",
      [styles.center]: center,
    })}
  >
    {children}
  </header>
);

export default CardHeader;
