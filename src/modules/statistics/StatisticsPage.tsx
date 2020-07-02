import React from 'react';

import { Navigation } from '../../components/navigation';

import s from './Statistics.module.scss';
import Statistics from './Statistics';

export interface Props {
  // Future props go here
}

export interface State {
  // Future state vars go here
}

export function StatisticsPage(): React.ReactElement {
  return (
    <div>
      <div className={s.root}>
        <Statistics />
      </div>
      <Navigation />
    </div>
  );
}

export default StatisticsPage;
