import { h } from "preact";
import { Segment, Divider } from "semantic-ui-react";
import { DonutChart } from "../../statistics/components";
import { Query } from "react-apollo";

import settings from "../../../config/settings";
import { GET_GOAL_PERCENTAGE } from "../queries";
import { calculateProgress } from "../../../support";
import { ProgressBar } from "./GoalProgress/GoalProgress";

import s from "./Rail.scss";

export default () => (
  <Segment className={s.rail}>
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
              <DonutChart value={0} />
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
            <DonutChart value={percentage} />

            <div style={{ paddingTop: "2em" }}>
              {goals
                .sort((goal1, goal2) => goal1.amount - goal2.amount)
                .map(goal => {
                  const percentage = calculateProgress(goal, currentKudos);
                  return (
                    <div key={goal.id} style={{ height: "84px" }}>
                      <Divider />
                      <p>{goal.name}</p>
                      <ProgressBar percentage={percentage} />
                      <span style={{ color: "grey", marginTop: "16px" }}>
                        {currentKudos} / {goal.amount}₭
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      }}
    </Query>
  </Segment>
);
