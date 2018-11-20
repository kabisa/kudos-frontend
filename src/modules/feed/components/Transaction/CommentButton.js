/* eslint-disable */
import { h } from "preact";
import { Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const CommentButton = ({ transactionId, text }) => (
  <Button size="mini" basic className="button-action">
    <Icon name="comment outline" />
    {text}
  </Button>
);

CommentButton.propTypes = {
  text: PropTypes.number.isRequired,
  transactionId: PropTypes.number.isRequired,
};

export default CommentButton;
