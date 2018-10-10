import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './CommentButton.css';

const CommentButton = ({ text }) => (
  <Button size="mini" basic className="button-action">
    <Icon name="comment outline" />
    {text}
  </Button>
);

CommentButton.propTypes = {
  text: PropTypes.number.isRequired
};

export default CommentButton;
