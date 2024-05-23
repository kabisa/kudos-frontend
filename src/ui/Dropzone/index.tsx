import { FC, PropsWithChildren } from "react";

import styles from "./index.module.css";

type DropzoneProps = {
  label?: string;
  [x: string]: any; // Plugin context determines which props are needed
};

const Dropzone: FC<PropsWithChildren<DropzoneProps>> = ({
  children,
  label,
  ...rest
}) => (
  <div className={styles.dropzone} {...rest}>
    {children}
    {label && <p>{label}</p>}
  </div>
);

export default Dropzone;
