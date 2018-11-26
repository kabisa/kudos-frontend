import { h } from "preact";
import { Line } from "rc-progress";
import { Query } from "react-apollo";
import moment from "moment";
import { Divider } from "semantic-ui-react";
import gql from "graphql-tag";

import { Circle } from "src/components";
import settings from "src/config/settings";
import { calculateProgress, getStrokeColor } from "src/support";

export const GET_GOAL_PERCENTAGE = gql`
  query getGoals($team_id: ID!) {
    teamById(id: $team_id) {
      activeGoals {
        id
        name
        amount
        achieved_on
      }
      activeKudosMeter {
        amount
      }
    }
  }
`;

const Statistics = ({ lineSize = 4 }) => (
  <div>
    <h4 style={{ paddingTop: "1em", margin: 0, color: "grey" }}>Next Goal:</h4>
    <Query
      query={GET_GOAL_PERCENTAGE}
      variables={{
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      }}
    >
      {({ loading, error, data }) => {
        if (loading || error) {
          return (
            <div>
              <h2>Loading...</h2>
              <Circle percent="0" />
            </div>
          );
        }
        const currentKudos = data.teamById.activeKudosMeter.amount;
        const goals = data.teamById.activeGoals;
        const nextGoal = goals.find(goal => goal.amount > currentKudos);

        const percentage = calculateProgress(goals, currentKudos);
        return (
          <div>
            <h2>{nextGoal.name}</h2>
            <Circle
              percent={percentage}
              text={`${percentage}%`}
              strokeColor={getStrokeColor(percentage)}
            />

            <div style={{ paddingTop: "1em" }}>
              {goals
                .sort((goal1, goal2) => goal1.amount - goal2.amount)
                .map(goal => {
                  const percentage = calculateProgress(goal, currentKudos);

                  return (
                    <div key={goal.id} style={{ height: "84px" }}>
                      <Divider />
                      <p>{goal.name}</p>
                      <Line
                        percent={percentage}
                        strokeWidth={lineSize}
                        strokeColor={getStrokeColor(percentage)}
                      />
                      <span style={{ color: "grey", marginTop: "16px" }}>
                        {!goal.achieved_on &&
                          `${currentKudos} / ${goal.amount}₭`}
                        {goal.achieved_on &&
                          `Achieved on ${moment(
                            goal.achieved_on,
                            "YYYY-MM-DD"
                          ).format("DD MMM, YYYY")}`}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      }}
    </Query>
  </div>
);

export default Statistics;
