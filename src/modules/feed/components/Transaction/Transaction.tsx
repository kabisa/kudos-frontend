import { FragmentPostResult } from "../../queries";
import { Header } from "./Header";
import LikeSection from "./LikeSection";

import s from "./Transaction.module.scss";

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
      <LikeSection data-testid="like-section" post={props.transaction} />
    </div>
  );
}

export default Transaction;
