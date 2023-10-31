import { FC } from "react";
import classNames from "classnames";

import styles from "./index.module.css";

type MessageBoxProps = {
    variant: 'default'|'success'|'error'
    title: string
    message: string
}

const MessageBox: FC<MessageBoxProps> = ({ variant, title, message }) => (
    <div className={ classNames(styles.message, { [styles.error]: variant === 'error' }) }>
        <h3>{ title }</h3>
        <p>{ message }</p>
    </div>
);

export default MessageBox;
