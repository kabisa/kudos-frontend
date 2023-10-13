import styles from "./Card.module.css";

import classNames from "classnames";

type CardProps = JSX.IntrinsicElements["div"];

const Card = ({ children, ...props }: CardProps) => (
  <div className={classNames(styles.container)} {...props}>
    {children}
  </div>
);

export default Card;
