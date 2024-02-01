import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Card.module.css";

type CardFooterProps = {
  theme?: "dark" | "light";
  center?: boolean;
  children: ReactNode;
};

const CardFooter = ({
  theme = "light",
  center = false,
  children,
}: CardFooterProps) => (
  <footer
    className={classNames(styles.cardFooter, styles[theme], {
      [styles.center]: center,
    })}
  >
    {children}
  </footer>
);

export default CardFooter;
