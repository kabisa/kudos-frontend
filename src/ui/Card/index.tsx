import { Icon, Card as UICard } from "@sandercamp/ui-components";
import styles from "./Card.module.css";
import { ReactNode } from "react";
import classNames from "classnames";
import Heading, { HeadingProps } from "../Heading";

type CardContainerProps = {
  theme?: "light" | "dark";
  children?: ReactNode;
};

const CardContainer = ({ theme = "light", children }: CardContainerProps) => (
  <UICard className={classNames(styles.card, styles[theme])}>{children}</UICard>
);

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

type CardTitleProps = {
  theme?: HeadingProps["theme"];
  children?: ReactNode;
};

const CardTitle = ({ theme = "light", children }: CardTitleProps) => (
  <Heading tag="h1" size="primary" theme={theme}>
    {children}
  </Heading>
);

const CardDescription = ({ children }: { children: ReactNode }) => (
  <p className={classNames(styles.cardDescription)}>{children}</p>
);

const CardContent = ({ children }: { children: ReactNode }) => (
  <div className={classNames(styles.cardContent)}>{children}</div>
);

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

export type CardProps = {
  theme?: "light" | "dark";
  title?: {
    text: string;
    iconName: string;
  };
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
  center?: boolean;
};

const Card = ({
  theme = "light",
  title,
  description,
  content,
  footer,
  center = false,
}: CardProps) => (
  <CardContainer theme={theme}>
    <CardHeader theme={theme} center={center}>
      <CardTitle theme={theme}>
        {title?.iconName ? (
          <>
            <Icon
              name={title.iconName}
              className={classNames(styles.icon, styles[theme])}
            />
            {title.text}
          </>
        ) : (
          title?.text
        )}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{content}</CardContent>
    <CardFooter center={center}>{footer}</CardFooter>
  </CardContainer>
);

const SecondaryCard = ({ title, description, content, footer }: CardProps) => (
  <CardContainer>
    <CardHeader theme="dark" center>
      <CardTitle theme="dark">
        {title?.iconName ? (
          <>
            <Icon
              name={title.iconName}
              className={classNames(styles.icon, styles.dark)}
            />
            {title.text}
          </>
        ) : (
          title?.text
        )}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{content}</CardContent>
    <CardFooter theme="dark" center>
      {footer}
    </CardFooter>
  </CardContainer>
);

export { Card, SecondaryCard };
