import LikeButton from "./LikeButton";
import { Header } from "./Header";
import settings from "../../../../config/settings";
import { FragmentPostResult } from "../../queries";
import { Storage } from "../../../../support/storage";

import s from "./Transaction.module.scss";

const userId = Storage.getItem(settings.USER_ID_TOKEN);

export interface TransactionProps {
  transaction: FragmentPostResult;
}

function Transaction(props: TransactionProps) {
  const { images } = props.transaction;

  return (
    <div data-testid="kudo-transaction" className={s.transaction}>
        <Header data-testid="post-header" transaction={props.transaction} />
        <div>
          <div data-test="post-message">
            <strong data-testid="sender-name">
              {props.transaction.sender.name}{" "}
            </strong>{" "}
            gave{" "}
            <strong data-testid="kudo-amount">
              {props.transaction.amount}₭{" "}
            </strong>
            to{" "}
            <strong data-testid="post-receivers">
              {props.transaction.receivers.map((item) => item.name).join(", ")}
            </strong>{" "}
            for{" "}
            <span data-testid="post-message">{props.transaction.message}</span>
          </div>
          {images && images.length > 0 && (
            <div className={s.images}>
              {images.map((image) => (
                <a href={image.imageUrl} key={image.imageThumbnailUrl}>
                  <img
                    src={image.imageThumbnailUrl}
                    className={s.image}
                    alt="Kudos afbeelding"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      <LikeButton
        data-testid="like-button"
        liked={props.transaction.votes.some(
          (vote) => vote.voter.id === userId,
        )}
        post={props.transaction}
      />
    </div>
  );
}

export default Transaction;
