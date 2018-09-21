import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.css';

export default () => (
  <div className="bottom-navigation">
    <Link to="/settings" className="bottom-item">
      <Icon name="setting" size="large" className="bottom-icon" />
    </Link>
    <Link to="/statistics" className="bottom-item">
      <Icon name="chart bar" size="large" className="bottom-icon" />
    </Link>
    <Link to="/" className="bottom-item">
      <Icon name="heart outline" size="large" className="bottom-icon" />
    </Link>
    <Link to="/notifications" className="bottom-item">
      <Icon name="bell outline" size="large" className="bottom-icon" />
    </Link>
    <Link to="/user" className="bottom-item">
      <Icon name="user outline" size="large" className="bottom-icon" />
    </Link>
  </div>
);
