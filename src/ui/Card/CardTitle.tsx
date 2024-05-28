import { Icon } from "@kabisa/ui-components";
import Heading, { HeadingTagVariants } from "../Heading";
import classNames from "classnames";
import styles from "./Card.module.css";

type CardTitleProps = {
  theme: "dark" | "light";
  icon?: string;
  text: string;
  tag: (typeof HeadingTagVariants)[number];
  size: "primary" | "secondary";
};

const CardTitle = ({ theme, icon, text, size, tag = "h1" }: CardTitleProps) => (
  <Heading tag={tag} size={size} theme={theme}>
    {icon ? (
      <div className={styles.headingIconContainer}>
        <Icon name={icon} className={classNames(styles.icon, styles[theme])} />
        {text}
      </div>
    ) : (
      text
    )}
  </Heading>
);

export default CardTitle;
