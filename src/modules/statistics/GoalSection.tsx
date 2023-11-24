import { Icon } from "@kabisa/ui-components";
import moment from "moment";

import { ActiveGoal } from "./Statistics";

import s from "./GoalSection.module.scss";

export interface GoalSectionProps {
  achievedColor: string;
  currentKudos: number;
  goals: ActiveGoal[];
  percentage: number;
  goal: ActiveGoal;
  nextGoal?: ActiveGoal;
  defaultColor: string;
  height: number;
  index: number;
}

interface KudoMeterProps {
  achievedColor: string;
  percentage: number;
  goal: ActiveGoal;
  nextGoal?: ActiveGoal;
  defaultColor: string;
  height: number;
}

function KudoMeter(props: KudoMeterProps) {
  return (
    <div>
      {/* Lock icons */}
      <div
        className={s.lock_container}
        style={{
          backgroundColor: props.goal.achievedOn
            ? props.achievedColor
            : props.defaultColor,
        }}
      >
        <Icon
          name={"lock"}
          className={s.lock_icon}
          style={{
            color: props.goal.achievedOn ? "white" : "black",
          }}
        />
      </div>

      {/* Bars */}
      <div
        data-testid="progress-bar"
        className={s.bar}
        style={{
          backgroundColor: props.goal.achievedOn
            ? props.achievedColor
            : props.defaultColor,
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
  );
}

export function GoalSection(props: GoalSectionProps) {
  return (
    <div data-testid="goal-section" className={s.container} key={props.goal.id}>
      <KudoMeter
        achievedColor={props.achievedColor}
        percentage={props.percentage}
        goal={props.goal}
        defaultColor={props.defaultColor}
        height={props.height}
        nextGoal={props.nextGoal}
      />

      {/* Text */}
      <h3 className={s.goal_amount}>{props.goal.amount} ₭</h3>
      <p className={s.goal_name}>
        [Goal {props.goals.length - props.index}] {props.goal.name}
      </p>
      <span className={s.goal_needed}>
        {!props.goal.achievedOn &&
          `${props.currentKudos} / ${props.goal.amount}₭`}
        {props.goal.achievedOn &&
          `Achieved on ${moment(props.goal.achievedOn, "YYYY-MM-DD").format(
            "DD MMM, YYYY",
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
