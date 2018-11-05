import { h } from "preact";
import { Card } from "semantic-ui-react";
import CommentButton from "./CommentButton/CommentButton";
import { LikeButton } from "./LikeButton";
import Header from "./Header/Header";

const Transaction = ({ transaction }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      paddingBottom: "4px",
      paddingTop: "4px",
      textAlign: "initial",
      margin: "auto",
      maxWidth: "420px",
    }}
  >
    <Card style={{ width: "100%" }}>
      <Card.Content>
        <Card.Header>
          <Header transaction={transaction} />
        </Card.Header>
        <Card.Description style={{ marginTop: "1em" }}>
          {transaction.message}
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

export default Transaction;
