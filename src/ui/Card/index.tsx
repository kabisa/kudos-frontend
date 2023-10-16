import { Card as UICard } from "@sandercamp/ui-components";
import styles from "./Card.module.css";
import { ReactNode } from "react";
import classNames from "classnames";

type CardProps = {
  children?: ReactNode;
  theme?: "dark" | "light";
};

const Card = ({ theme = "light", children }: CardProps) => (
  <UICard className={classNames(styles.card, styles[theme])}>{children}</UICard>
);

const CardHeader = ({ children }: { children: ReactNode }) => (
  <div className={styles.cardHeader}>{children}</div>
);

const CardTitle = ({ children }: { children: ReactNode }) => (
  <h1 className={classNames(styles.cardTitle)}>{children}</h1>
);

const CardDescription = ({ children }: { children: ReactNode }) => (
  <p className={classNames(styles.cardDescription)}>{children}</p>
);

const CardContent = ({ children }: { children: ReactNode }) => (
  <div className={classNames(styles.cardContent)}>{children}</div>
);

const CardFooter = ({ children }: { children: ReactNode }) => (
  <div className={classNames(styles.cardFooter)}>{children}</div>
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
