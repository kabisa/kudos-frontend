import { Icon } from "@kabisa/ui-components";
import Currency from "../Currency";
import styles from "./styles.module.css";

type LikeButtonProps = {
  liked: boolean;
  onClick: () => void;
};

export const LikeButton = ({ liked = false, onClick }: LikeButtonProps) => {
  return (
    <button type="button" className={styles.likeButton} onClick={onClick}>
      <Icon fill={liked} name="thumb_up" data-testid="like-icon" />
      <Currency amount={1} />
      {liked && <span className={styles.liked}>Liked</span>}
    </button>
  );
};
