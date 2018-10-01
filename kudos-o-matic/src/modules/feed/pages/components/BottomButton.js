import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './BottomButton.css';

const BottomButton = ({ color, icon, text }) => (
  <Button size="mini" basic color={color} className="button-action">
    <Icon name={icon} />
    {text}
  </Button>
);

BottomButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

BottomButton.defaultProps = {
  color: null
};

export default BottomButton;
