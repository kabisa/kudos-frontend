import { FC } from "react";

import styles from "./Segment.module.css";

import classNames from "classnames";

const Segment: FC<JSX.IntrinsicElements["div"]> = ({
  children,
  className,
  ...props
}) => (
  <div className={classNames(styles.container, className)} {...props}>
    {children}
  </div>
);

export default Segment;
