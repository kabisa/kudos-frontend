import { FC } from "react";

import { Navigation } from "../navigation";

import styles from "./Page.module.css";

const Page: FC = ({ children }) => (
  <div className={styles.page}>
    <Navigation className={styles.navigation} />
    <main className={styles.main}>{children}</main>
  </div>
);

export default Page;
