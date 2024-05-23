import { FC } from "react";
import classNames from "classnames";

import styles from "./index.module.css";

export type MessageBoxProps = {
  variant?: "default" | "success" | "error";
  title: string;
  message: string;
};

const MessageBox: FC<MessageBoxProps> = ({
  title,
  message,
  variant = "default",
}) => (
  <div className={classNames(styles.message, styles[variant])}>
    <h3>{title}</h3>
    <p>{message}</p>
  </div>
);

export default MessageBox;
