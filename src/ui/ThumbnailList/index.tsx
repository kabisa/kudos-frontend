import { FC } from "react";

import Thumbnail from '../Thumbnail';

import styles from "./index.module.css";

type ThumbnailListProps = {
    thumbnails: Array<JSX.IntrinsicElements["img"]>
}

const ThumbnailList: FC<ThumbnailListProps> = ({ thumbnails }) => (
    <ul className={ styles.list }>
        { thumbnails.map((thumbnail, index) => (
            <li key={ index }>
                <Thumbnail { ...thumbnail }/>
            </li>
        ))}
    </ul>
);

export default ThumbnailList;
