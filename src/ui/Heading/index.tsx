import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const HeadingSizeVariants = ["primary", "secondary"] as const;
const HeadingTagVariants = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export type HeadingProps = PropsWithChildren<{
  tag: (typeof HeadingTagVariants)[number];
  size: (typeof HeadingSizeVariants)[number];
  theme?: "black" | "white";
}>;

const Heading = ({
  tag,
  size = "primary",
  theme = "black",
  children,
}: HeadingProps) => {
  const Tag = tag;
  return (
    <Tag className={classNames(styles[size], styles[theme])}>{children}</Tag>
  );
};

export default Heading;
