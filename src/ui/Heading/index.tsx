import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const HeadingSizeVariants = ["primary", "secondary"] as const;
const HeadingTagVariants = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const HeadingFontWeightVariants = [
  "thin",
  "light",
  "regular",
  "medium",
  "bold",
] as const;

export type HeadingProps = PropsWithChildren<{
  tag: (typeof HeadingTagVariants)[number];
  size: (typeof HeadingSizeVariants)[number];
  fontWeight?: (typeof HeadingFontWeightVariants)[number];
  className?: string;
}>;

const Heading = ({
  tag,
  size = "primary",
  fontWeight = "bold",
  className,
  children,
}: HeadingProps) => {
  const Tag = tag;
  return (
    <Tag
      className={classNames(
        styles[`font-size-${size}`],
        fontWeight && styles[`font-weight-${fontWeight}`],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
