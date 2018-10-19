import { h } from "preact";
import { Button, Icon } from "semantic-ui-react";
import { route } from "preact-router";
import PropTypes from "prop-types";

const CommentButton = ({ transactionId, text }) => (
  <Button
    size="mini"
    basic
    className="button-action"
    onClick={() => route(`/comments/${transactionId}`)}
  >
    <Icon name="comment outline" />
    {text}
  </Button>
);

CommentButton.propTypes = {
  text: PropTypes.number.isRequired,
  transactionId: PropTypes.number.isRequired,
};

export default CommentButton;
