import { Card as UICard } from "@sandercamp/ui-components";
import styles from "./Card.module.css";
import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";

type CardContainerProps = {
  theme?: "light" | "dark";
  variant?: "primary" | "secondary";
};

const CardContainer = ({
  theme = "light",
  variant = "primary",
  children,
}: PropsWithChildren<CardContainerProps>) => (
  <UICard className={classNames(styles.card, styles[variant], styles[theme])}>
    {children}
  </UICard>
);

export type CardProps = {
  theme?: "light" | "dark";
  title: {
    text: string;
    iconName?: string;
  };
  variant?: "primary" | "secondary";
  description?: string;
  content: ReactNode;
  footer?: ReactNode;
  center?: boolean;
  date?: string;
};

const Card = ({
  theme = "light",
  title,
  content,
  variant = "primary",
  center = false,
}: CardProps) => (
  <CardContainer theme={theme} variant={variant}>
    <CardHeader theme={theme} center={center}>
      <CardTitle
        theme={theme}
        icon={title.iconName}
        text={title.text}
        tag="h2"
        size="secondary"
      />
    </CardHeader>
    <CardContent>{content}</CardContent>
  </CardContainer>
);

const SecondaryCard = ({
  theme = "light",
  title,
  date,
  content,
  footer,
}: CardProps) => (
  <CardContainer theme={theme} variant="secondary">
    <CardHeader theme="dark" center={true}>
      <CardTitle theme="dark" text={title.text} tag="h2" size="primary" />
      <time className={styles.date}>{date}</time>
    </CardHeader>
    <CardContent>{content}</CardContent>
    <CardFooter theme="dark">{footer}</CardFooter>
  </CardContainer>
);

export { Card, SecondaryCard };
