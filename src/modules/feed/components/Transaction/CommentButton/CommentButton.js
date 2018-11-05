import { h } from "preact";
import { Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const CommentButton = ({ transactionId, text }) => (
  <a href={`/comments/${transactionId}`}>
    <Button size="mini" basic className="button-action">
      <Icon name="comment outline" />
      {text}
    </Button>
  </a>
);

CommentButton.propTypes = {
  text: PropTypes.number.isRequired,
  transactionId: PropTypes.number.isRequired,
};

export default CommentButton;
