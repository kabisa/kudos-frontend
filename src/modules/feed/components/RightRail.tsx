import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Statistics } from '../../statistics';

import s from './Rail.module.scss';

const style = {
  height: '900px',
  overflow: 'auto',
  borderRadius: '18px',
  background: '#00284A',
};
const slackIconPath = `${process.env.PUBLIC_URL}/assets/kabisa_logo_white.png`;

export default () => (
  <Segment
    className={s.rail}
    style={style}
  >
    <Statistics />
    <img style={{ maxHeight: 150, maxWidth: 123, marginTop: 50 }} alt="Kabisa logo" src={slackIconPath} />
  </Segment>
);
