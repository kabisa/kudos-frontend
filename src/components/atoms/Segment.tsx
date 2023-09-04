import React from "react";

import styles from "./Segment.module.css";

import classNames from "classnames";

const Segment: React.FC<JSX.IntrinsicElements["div"]> = ({
  children,
  className,
  ...props
}) => (
  <div className={classNames(styles.container, className)} {...props}>
    {children}
  </div>
);

export default Segment;
