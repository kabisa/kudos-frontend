import { Card as UICard } from "@sandercamp/ui-components";
import styles from "./Card.module.css";
import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
};

const Card = ({ children }: CardProps) => (
  <UICard className={styles.container}>{children}</UICard>
);

export default Card;
