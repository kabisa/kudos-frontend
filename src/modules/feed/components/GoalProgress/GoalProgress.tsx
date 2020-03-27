import React from 'react';
import { Query } from '@apollo/react-components';
import { Line } from 'rc-progress';
import { Icon } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import settings from '../../../../config/settings';
import { GET_GOAL_PERCENTAGE } from '../../queries';
import { PATH_STATISTICS } from '../../../../routes';
import { calculateProgress, getStrokeColor } from '../../../../support';

import s from './GoalProgress.module.scss';
import { GetGoalPercentageResult } from '../../../statistics/Statistics';

export const GoalProgress = () => (
  <Query<GetGoalPercentageResult>
    query={GET_GOAL_PERCENTAGE}
    variables={{
      team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
    }}
  >
    {({ loading, error, data }) => {
      if (error) {
        return <span>{error.message}</span>;
      }

      if (loading || !data) {
        return (
          <a
            data-testid="loading"
            id="kudo-progress-loading"
            className="kudo-progress"
            href={`${PATH_STATISTICS}?transition=none`}
          >
            <div className="kudo-progress-bar-loading" />
          </a>
        );
      }

      const percentage = calculateProgress(data.teamById.activeGoals,
        data.teamById.activeKudosMeter.amount);

      return (
        <Link to={`${PATH_STATISTICS}`}>
          <div className={s.root}>
            {/* Lock icons */}
            <div className={s.lock_container} style={{ backgroundColor: getStrokeColor(percentage) }}>
              <Icon data-testid="open-lock" name="lock open" className={s.lock} />
            </div>
            <Line
              data-testid="progress-line"
              percent={percentage}
              strokeWidth={3}
              strokeLinecap="square"
              className={s.line}
              strokeColor={getStrokeColor(percentage)}
            />
            <div className={s.lock_container} style={{ backgroundColor: getStrokeColor(percentage) }}>
              <Icon data-testid="closed-lock" name="lock" className={s.lock} />
            </div>
          </div>
        </Link>
      );
    }}
  </Query>
);

export default GoalProgress;
