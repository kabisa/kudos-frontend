import React from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import s from './GoalSection.module.scss';
import { ActiveGoal } from './Statistics';

export interface GoalSectionProps {
  achievedColor: string;
  currentKudos: number;
  goals: ActiveGoal[];
  percentage: number;
  goal: ActiveGoal;
  nextGoal?: ActiveGoal;
  defaultColor: string
  height: number;
  index: number;
}

export function GoalSection(props: GoalSectionProps): React.ReactElement {
  return (
    <div data-testid="goal-section" key={props.goal.id} style={{ height: '100px' }}>
      <div>
        {/* Lock icons */}
        <div
          className={s.lock_container}
          style={{
            backgroundColor: props.goal.achievedOn ? props.achievedColor : props.defaultColor,
          }}
        >
          <Icon
            name={props.goal.achievedOn ? 'lock open' : 'lock'}
            className={s.lock_icon}
            style={{
              color: props.goal.achievedOn ? 'white' : 'black',
            }}
          />
        </div>

        {/* Bars */}
        <div
          data-testid="progress-bar"
          className={s.bar}
          style={{
            backgroundColor: props.goal.achievedOn ? props.achievedColor : props.defaultColor,
          }}
        />

        {/* Progress bar */}
        {props.nextGoal === props.goal && (
        <div
          data-testid="next-progress-bar"
          className={s.progress_bar}
          style={{
            height: `${75 - (70 - props.height)}px`,
            marginTop: `${30 + (70 - props.height)}px`,
            backgroundColor: props.achievedColor,
          }}
        />
        )}

        {/* The percentage banner */}
        {props.nextGoal === props.goal && (
        <div
          className={s.percentage_banner}
          style={{
            marginTop: `${30 + (70 - props.height - 8)}px`,
          }}
        >
          <p className={s.current_percentage}>{props.percentage}%</p>
        </div>
        )}
      </div>

      {/* Text */}
      <h3 className={s.goal_amount}>{props.goal.amount} ₭</h3>
      <p className={s.goal_name}>
        [Goal {props.goals.length - props.index}] {props.goal.name}
      </p>
      <span className={s.goal_needed}>
        {!props.goal.achievedOn && `${props.currentKudos} / ${props.goal.amount}₭`}
        {props.goal.achievedOn
                && `Achieved on ${moment(props.goal.achievedOn, 'YYYY-MM-DD').format(
                  'DD MMM, YYYY',
                )}`}
      </span>

      {/* Dot at the bottom */}
      {props.index === props.goals.length - 1 && (
        <div
          className={s.bottom_dot}
          style={{
            backgroundColor: props.achievedColor,
          }}
        />
      )}
    </div>

  );
}
