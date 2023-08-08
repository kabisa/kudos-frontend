import React from "react";
import { Query } from "@apollo/client/react/components";
import moment from "moment";
import { gql } from "@apollo/client";

import { Circle } from "../../components/Circle";
import settings from "../../config/settings";
import { calculateProgress } from "../../support";
import { Storage } from "../../support/storage";

import s from "./Statistics.module.scss";
import { GoalSection } from "./GoalSection";

export const GET_GOAL_PERCENTAGE = gql`
  query getGoals($team_id: ID!) {
    teamById(id: $team_id) {
      activeGoals {
        id
        name
        amount
        achievedOn
      }
      activeKudosMeter {
        amount
      }
    }
  }
`;

export interface GetGoalPercentageResult {
  teamById: {
    activeGoals: ActiveGoal[];
    activeKudosMeter: {
      amount: number;
    };
  };
}

export interface ActiveGoal {
  id: string;
  name: string;
  amount: number;
  achievedOn: string;
}

const achievedColor = "#3899b7";
const defaultColor = "#b2cbc1";

const Statistics = () => (
  <div className={s.container}>
    <h1 className={s.kudo_header}>₭udometer</h1>
    <p className={s.today}>{moment().format("MMMM Do, YYYY")}</p>

    <Query<GetGoalPercentageResult>
      query={GET_GOAL_PERCENTAGE}
      variables={{
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      }}
    >
      {({ loading, error, data }) => {
        if (loading || error || !data) {
          return (
            <div className={s.circle_container}>
              <h3>Loading...</h3>
              <Circle percent={0} />
            </div>
          );
        }
        const currentKudos = data.teamById.activeKudosMeter.amount;
        const goals = data.teamById.activeGoals.sort(
          (goal1, goal2) => goal1.amount - goal2.amount
        );

        const nextGoal = goals.find((goal) => goal.amount > currentKudos);

        const percentage = calculateProgress(goals, currentKudos);
        const height = calculateProgress(goals, currentKudos, 70);
        return (
          <div className={s.circle_container}>
            <h3 className={s.next_goal}>Next goal</h3>
            <Circle
              defaultColor={defaultColor}
              percent={percentage}
              strokeColor={achievedColor}
              currentKudos={currentKudos}
              neededKudos={nextGoal ? nextGoal.amount : 0}
              goal={nextGoal ? nextGoal.name : "-"}
            />

            <div className={s.goal_container}>
              {goals
                .sort((goal1, goal2) => goal2.amount - goal1.amount)
                .map((goal, index) => (
                  <GoalSection
                    key={goal.id}
                    achievedColor={achievedColor}
                    currentKudos={currentKudos}
                    goals={goals}
                    percentage={percentage}
                    goal={goal}
                    nextGoal={nextGoal}
                    defaultColor={defaultColor}
                    height={height}
                    index={index}
                  />
                ))}
            </div>
          </div>
        );
      }}
    </Query>
  </div>
);

export default Statistics;
