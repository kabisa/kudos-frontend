import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Statistics } from '../../statistics';

import s from './Rail.module.scss';

const style = {
  height: '755px',
  overflow: 'auto',
  borderRadius: '10px',
};

export default () => (
  <Segment
    className={s.rail}
    style={style}
  >
    <Statistics />
  </Segment>
);
