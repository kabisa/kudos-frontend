import { h } from "preact";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "preact-redux";
import PropTypes from "prop-types";
import { likeTransaction } from "../../../../actions";

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

LikeButton.propTypes = {
  like: PropTypes.func.isRequired,
  transactionId: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  like: likeTransaction,
};

export default connect(
  null,
  mapDispatchToProps
)(LikeButton);
