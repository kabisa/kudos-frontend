import { FC } from "react";

import styles from "./index.module.css";

const Thumbnail: FC<JSX.IntrinsicElements["img"]> = props => (
    <img className={ styles.img } { ...props } />
);

export default Thumbnail;
