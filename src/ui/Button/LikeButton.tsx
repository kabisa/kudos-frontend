import classNames from "classnames";
import { Icon } from "@kabisa/ui-components";
import styles from "./styles.module.css";
import Currency from "../Currency";

type LikeButtonProps = {
  liked: boolean;
  onClick: () => void;
};

export const LikeButton = ({ liked = false, onClick }: LikeButtonProps) => {
  const likedStyles = classNames({
    ["material-symbols-rounded"]: liked,
    ["material-symbols-rounded-outlined"]: !liked,
  });

  return (
    <button type="button" className={styles.likeButton} onClick={onClick}>
      <Icon className={likedStyles} name="thumb_up" />
      <Currency amount={1} />
      {liked && <span className={styles.liked}>Liked</span>}
    </button>
  );
};
