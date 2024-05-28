import { FC } from "react";
import classNames from 'classnames';

import { Navigation } from "../navigation";

import styles from "./Page.module.css";

type PageProps = {
    className?: string;
};

const Page: FC<PageProps> = ({ children, className }) => (
  <div className={ classNames(styles.page, className)}>
    <Navigation className={styles.navigation} />
    <main className={styles.main}>{children}</main>
  </div>
);

export default Page;
