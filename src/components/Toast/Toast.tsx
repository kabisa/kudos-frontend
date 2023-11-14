import { ToastContainer, toast } from "react-toastify";

import styles from "./Toast.module.css";

const ToastWrapper = () => (
  <ToastContainer
    toastClassName={styles.toastContainer}
    autoClose={4000}
    position="top-right"
    theme="dark"
    icon={false}
    pauseOnHover
    progressClassName={styles.toastProgress}
  />
);

export { ToastWrapper, toast };
