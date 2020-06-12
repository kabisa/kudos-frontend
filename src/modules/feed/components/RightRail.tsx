import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Statistics } from '../../statistics';

import s from './Rail.module.scss';

const style = {
  height: '850px',
  overflow: 'auto',
  borderRadius: '18px',
  background: '#00284A',
};

export default () => (
  <Segment
    className={s.rail}
    style={style}
  >
    <Statistics />
  </Segment>
);
