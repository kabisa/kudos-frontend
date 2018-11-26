import { h } from "preact";
import { Query } from "react-apollo";
import { Line } from "rc-progress";

import settings from "../../../../config/settings";
import { GET_GOAL_PERCENTAGE } from "../../queries";
import { PATH_STATISTICS } from "../../../../routes";
import { calculateProgress, getStrokeColor } from "../../../../support";

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
          <div
            style={{
              width: "90%",
              margin: "auto",
              height: "3em",
              paddingTop: "14px",
            }}
          >
            <Line
              percent={percentage}
              strokeWidth={3}
              strokeColor={getStrokeColor(percentage)}
            />
          </div>
        </a>
      );
    }}
  </Query>
);

export default GoalProgress;
