import { h } from "preact";
import { Card, Embed } from "semantic-ui-react";

import CommentButton from "./CommentButton/CommentButton";
import { LikeButton } from "./LikeButton";
import Header from "./Header/Header";

import s from "./Transaction.scss";

const Transaction = ({ transaction }) => {
  return (
    <div className={s.root}>
      <Card style={{ width: "100%" }}>
        <Card.Content>
          <Card.Header>
            <Header transaction={transaction} />
          </Card.Header>
          <Card.Description style={{ marginTop: "1em" }}>
            {transaction.message}
            <Embed
              className={s.embed}
              id="O6Xo21L0ybE"
              placeholder="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1680,c_fill,g_auto,h_945,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180316113418-travel-with-a-dog-3.jpg"
              source="youtube"
            />
          </Card.Description>
        </Card.Content>
        <Card.Content extra style={{ padding: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <LikeButton
              transactionId={transaction.id}
              liked={transaction.liked}
              likes={transaction.likes}
            />
            <CommentButton
              transactionId={transaction.id}
              text={transaction.comments}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Transaction;
