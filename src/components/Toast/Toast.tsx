import { ToastContainer, toast } from "react-toastify";

import styles from "./Toast.module.css";

const ToastWrapper = () => (
  <ToastContainer
    toastClassName={styles.toastContainer}
    autoClose={4000}
    position="top-right"
    theme="light"
    icon={false}
    pauseOnHover
  />
);

export { ToastWrapper, toast };
