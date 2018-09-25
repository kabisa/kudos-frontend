import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './ActionButton.css';

const ActionButton = ({ color, icon, text }) => (
  <Button size="mini" basic color={color} className="button-action">
    <Icon name={icon} />
    {text}
  </Button>
);

ActionButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

ActionButton.defaultProps = {
  color: null
};

export default ActionButton;
