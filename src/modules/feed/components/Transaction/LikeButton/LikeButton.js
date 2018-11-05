import { h } from "preact";
import { Button, Icon } from "semantic-ui-react";

export const LikeButton = ({ transactionId, liked, likes, like }) => (
  <Button
    size="mini"
    basic
    className="button-action"
    onClick={() => like(transactionId)}
  >
    <Icon
      name={liked ? "heart" : "heart outline"}
      color={liked ? "red" : null}
    />
    {likes}
  </Button>
);

export default LikeButton;
