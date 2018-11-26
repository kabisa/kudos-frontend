import { h } from "preact";
import { Query } from "react-apollo";

import settings from "../../../../config/settings";
import { GET_GOAL_PERCENTAGE } from "../../queries";
import { PATH_STATISTICS } from "../../../../routes";
import { calculateProgress } from "../../../../support";

export const ProgressBar = ({ percentage }) => (
  <div className="kudo-progress">
    <div className="kudo-progress-bar" style={{ width: `${percentage}%` }} />{" "}
    <div
      className="kudo-progress-bar-negative"
      style={{ width: `${100 - percentage}%` }}
    />
  </div>
);

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
          <ProgressBar percentage={percentage} />
        </a>
      );
    }}
  </Query>
);

export default GoalProgress;
