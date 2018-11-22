import { h } from "preact";
import { Card, Modal, Image, Button } from "semantic-ui-react";
import LikeButton from "./LikeButton";
import Header from "./Header";
import settings from "src/config/settings";

const userId = localStorage.getItem(settings.USER_ID_TOKEN);

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
          <strong>{transaction.sender.name}</strong> gave{" "}
          <strong>{transaction.amount}₭ </strong>
          to{" "}
          <strong>
            {transaction.receivers.map(item => item.name).join(", ")}
          </strong>{" "}
          for {transaction.message}
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{ padding: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <LikeButton
            transactionId={transaction.id}
            liked={transaction.votes.some(vote => vote.voter.id === userId)}
            likes={transaction.votes.length}
            post={transaction}
          />
        </div>
      </Card.Content>
    </Card>
  </div>
);

export default Transaction;
