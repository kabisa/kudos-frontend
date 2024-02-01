import classNames from "classnames";
import React, { ReactNode } from "react";
import styles from "./Card.module.css";

const CardContent = ({ children }: { children: ReactNode }) => (
  <article className={classNames(styles.cardContent)}>{children}</article>
);

export default CardContent;
