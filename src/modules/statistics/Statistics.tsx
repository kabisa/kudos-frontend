import React from 'react';
import { Query } from '@apollo/react-components';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';

import { Circle } from '../../components/Circle';
import settings from '../../config/settings';
import { calculateProgress } from '../../support';
import { Storage } from '../../support/storage';

import s from './Statistics.module.scss';

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

const achievedColor = '#3899B7';

const Statistics = () => (
  <div className={s.container}>
    <h2 className={s.kudo_header}>₭udometer</h2>
    <h4 style={{ color: '#FFF', marginTop: '0.6rem' }}>{moment().format('MMMM Do, YYYY')}</h4>

    <Query<GetGoalPercentageResult>
      query={GET_GOAL_PERCENTAGE}
      variables={{
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      }}
    >
      {({ loading, error, data }) => {
        if (loading || error || !data) {
          return (
            <div>
              <h2>Loading...</h2>
              <Circle percent={0} />
            </div>
          );
        }
        const currentKudos = data.teamById.activeKudosMeter.amount;
        const goals = data.teamById.activeGoals.sort((goal1, goal2) => goal1.amount - goal2.amount);

        const nextGoal = goals.find((goal) => goal.amount > currentKudos);

        const percentage = calculateProgress(goals, currentKudos);
        const height = calculateProgress(goals, currentKudos, 70);
        return (
          <div style={{ color: '#FFF', marginTop: '2em' }}>
            <h3 className={s.next_goal}>Next goal</h3>
            <Circle
              percent={percentage}
              strokeColor={achievedColor}
              currentKudos={currentKudos}
              neededKudos={nextGoal ? nextGoal.amount : 0}
              goal={nextGoal ? nextGoal.name : '-'}
            />

            <div style={{ paddingTop: '3em', position: 'relative' }}>
              {goals
                .sort((goal1, goal2) => goal2.amount - goal1.amount)
                .map((goal, index) => (
                  <div data-testid="goal-section" key={goal.id} style={{ height: '100px' }}>
                    <div>
                      {/* Lock icons */}
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          position: 'absolute',
                          backgroundColor: goal.achievedOn ? achievedColor : '#B2CBC1',
                          borderRadius: '15px',
                        }}
                      >
                        <Icon
                          name={goal.achievedOn ? 'lock open' : 'lock'}
                          style={{
                            position: 'absolute',
                            left: '6.5px',
                            marginTop: '4.5px',
                            color: goal.achievedOn ? 'white' : 'black',
                          }}
                        />
                      </div>

                      {/* Bars */}
                      <div
                        data-testid="progress-bar"
                        style={{
                          width: '12px',
                          height: '80px',
                          marginTop: '25px',
                          position: 'absolute',
                          backgroundColor: goal.achievedOn ? achievedColor : '#B2CBC1',
                          marginLeft: '9px',
                        }}
                      />

                      {/* Progress bar */}
                      {nextGoal === goal && (
                      <div
                        data-testid="next-progress-bar"
                        style={{
                          width: '12px',
                          height: `${75 - (70 - height)}px`,
                          marginTop: `${30 + (70 - height)}px`,
                          position: 'absolute',
                          backgroundColor: achievedColor,
                          marginLeft: '9px',
                        }}
                      />
                      )}

                      {/* The percentage banner */}
                      {nextGoal === goal && (
                      <div
                        style={{
                          position: 'absolute',
                          width: '50px',
                          height: '2px',
                          marginTop: `${30 + (70 - height - 8)}px`,
                          marginLeft: '9px',
                        }}
                      >
                        <p className={s.current_percentage_text}>{percentage}%</p>
                      </div>
                      )}
                    </div>

                    {/* Text */}
                    <h3 style={{ marginBottom: '2px', marginTop: '0px' }}>{goal.amount} ₭</h3>
                    <p style={{ marginBottom: '4px' }}>
                      [Goal {goals.length - index}] {goal.name}
                    </p>
                    <span
                      style={{
                        marginTop: '16px',
                        marginBottom: '0px',
                      }}
                    >
                      {!goal.achievedOn
                      && `${currentKudos} / ${goal.amount}₭`}
                      {goal.achievedOn
                      && `Achieved on ${moment(goal.achievedOn, 'YYYY-MM-DD').format(
                        'DD MMM, YYYY',
                      )}`}
                    </span>

                    {/* Dot at the bottom */}
                    {index === goals.length - 1 && (
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        marginTop: '33px',
                        position: 'absolute',
                        backgroundColor: achievedColor,
                        borderRadius: '15px',
                      }}
                    />
                    )}
                  </div>
                ))}
            </div>
          </div>
        );
      }}
    </Query>
  </div>
);

export default Statistics;
