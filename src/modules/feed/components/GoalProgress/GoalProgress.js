import React from "react";
import { Query } from "react-apollo";
import { Line } from "rc-progress";
import { Icon } from "semantic-ui-react";

import settings from "../../../../config/settings";
import { GET_GOAL_PERCENTAGE } from "../../queries";
import { PATH_STATISTICS } from "../../../../routes";
import { calculateProgress, getStrokeColor } from "../../../../support";

import s from "./GoalProgress.module.scss";

export const GoalProgress = () => (
  <Query
    query={GET_GOAL_PERCENTAGE}
    variables={{
      team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
    }}
  >
    {({ loading, error, data }) => {
      if (loading || error) {
        return (
          <a
            id="kudo-progress-loading"
            className="kudo-progress"
            href={`${PATH_STATISTICS}?transition=none`}
          >
            <div className="kudo-progress-bar-loading" />
          </a>
        );
      }

      const percentage = calculateProgress(
        data.teamById.activeGoals,
        data.teamById.activeKudosMeter.amount
      );

      return (
        <a href={`${PATH_STATISTICS}?transition=none`}>
          <div className={s.root}>
            {/* Lock icons */}
            <div
              className={s.lock_container}
              style={{ backgroundColor: getStrokeColor(percentage) }}
            >
              <Icon name="lock open" className={s.lock} />
            </div>
            <Line
              percent={percentage}
              strokeWidth={3}
              strokeLinecap="square"
              className={s.line}
              strokeColor={getStrokeColor(percentage)}
            />
            <div
              className={s.lock_container}
              style={{ backgroundColor: getStrokeColor(percentage) }}
            >
              <Icon name="lock" className={s.lock} />
            </div>
          </div>
        </a>
      );
    }}
  </Query>
);

export default GoalProgress;
