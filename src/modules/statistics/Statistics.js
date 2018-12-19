import { h } from "preact";
import { Query } from "react-apollo";
import moment from "moment";
import { Icon } from "semantic-ui-react";
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

const Statistics = () => (
  <div>
    <h2
      style={{
        paddingTop: "1em",
        margin: 0,
        color: "grey",
        display: "relative",
      }}
    >
      ₭udometer
    </h2>
    <h4 style={{ marginTop: "0.6rem" }}>{moment().format("MMMM Do, YYYY")}</h4>

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
        const goals = data.teamById.activeGoals.sort(
          (goal1, goal2) => goal1.amount - goal2.amount
        );

        let nextGoal = goals.find(goal => goal.amount > currentKudos);

        const percentage = parseInt(calculateProgress(goals, currentKudos));
        const height = parseInt(calculateProgress(goals, currentKudos, 70));
        return (
          <div style={{ marginTop: "2em" }}>
            <h3>Next goal</h3>
            <Circle
              percent={percentage}
              strokeColor={getStrokeColor(percentage)}
              currentKudos={currentKudos}
              neededKudos={nextGoal ? nextGoal.amount : "-"}
              goal={nextGoal ? nextGoal.name : "-"}
            />

            <div style={{ paddingTop: "3em", position: "relative" }}>
              {goals
                .sort((goal1, goal2) => goal2.amount - goal1.amount)
                .map((goal, index) => {
                  return (
                    <div key={goal.id} style={{ height: "100px" }}>
                      <div>
                        {/* Lock icons */}
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            position: "absolute",
                            backgroundColor: goal.achieved_on
                              ? "#2490d5"
                              : "lightgrey",
                            borderRadius: "6px",
                            // zIndex: "5",
                            color: goal.achieved_on ? "white" : null,
                          }}
                        >
                          <Icon
                            name={goal.achieved_on ? "lock open" : "lock"}
                            style={{
                              position: "absolute",
                              left: "6.5px",
                              marginTop: "4.5px",
                              // zIndex: "5",
                            }}
                          />
                        </div>

                        {/* Bars */}
                        <div
                          style={{
                            width: "12px",
                            height: "70px",
                            marginTop: "30px",
                            position: "absolute",
                            backgroundColor: goal.achieved_on
                              ? "#2490d5"
                              : "lightgrey",
                            marginLeft: "9px",
                          }}
                        />

                        {/* Progress bar */}
                        {nextGoal === goal && (
                          <div
                            style={{
                              width: "12px",
                              height: `${70 - (70 - height)}px`,
                              marginTop: `${30 + (70 - height)}px`,
                              position: "absolute",
                              backgroundColor: "#2490d5",
                              marginLeft: "9px",
                            }}
                          />
                        )}

                        {/* The percentage banner */}
                        {nextGoal === goal && (
                          <div
                            style={{
                              position: "absolute",
                              // zIndex: "10",
                              width: "50px",
                              height: "2px",
                              marginTop: `${30 + (70 - height)}px`,
                              backgroundColor: "black",
                              marginLeft: "9px",
                            }}
                          >
                            <p style={{ float: "right" }}>{percentage}%</p>
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <h3 style={{ marginBottom: "2px", marginTop: "0px" }}>
                        {goal.amount} ₭
                      </h3>
                      <p style={{ color: "grey", marginBottom: "4px" }}>
                        [Goal {goals.length - index}] {goal.name}
                      </p>
                      <span
                        style={{
                          color: "grey",
                          marginTop: "16px",
                          marginBottom: "0px",
                        }}
                      >
                        {!goal.achieved_on &&
                          `${currentKudos} / ${goal.amount}₭`}
                        {goal.achieved_on &&
                          `Achieved on ${moment(
                            goal.achieved_on,
                            "YYYY-MM-DD"
                          ).format("DD MMM, YYYY")}`}
                      </span>

                      {/* Dot at the bottom */}
                      {index === goals.length - 1 && (
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            marginTop: "33px",
                            position: "absolute",
                            backgroundColor: "#2490d5",
                            borderRadius: "6px",
                          }}
                        >
                          <Icon
                            name="dot circle"
                            style={{
                              position: "absolute",
                              left: "6.5px",
                              marginTop: "5.5px",
                              // zIndex: "5",
                              color: "white",
                            }}
                          />
                        </div>
                      )}
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
