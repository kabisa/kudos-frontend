import classNames from "classnames";
import styles from "./styles.module.css";
import { Icon } from "@kabisa/ui-components";

type Goal = {
  id: string;
  name: string;
  amount: number;
  achievedOn: string | null;
};

type ActiveGoalAmount = {
  amount: number;
};

type GoalProgressIndicatorProps = {
  goals: Goal[];
  activeKudosMeter: ActiveGoalAmount;
};

const GoalProgressIndicator = ({
  goals,
  activeKudosMeter,
}: GoalProgressIndicatorProps) => {
  return (
    <>
      {goals.map((goal: Goal) => {
        const activeGoal = goals
          .slice()
          .reverse()
          .find((goal: Goal) => !goal.achievedOn);
        const showIndicator = activeGoal?.id === goal.id;

        const previousGoal =
          goals
            ?.slice()
            // .reverse()
            .find((goal: Goal) => goal.achievedOn)?.amount || 0;

        console.log(activeKudosMeter, previousGoal, activeGoal);

        const percentageProgress = Math.floor(
          ((activeKudosMeter.amount - previousGoal) /
            ((activeGoal?.amount || 0) - previousGoal)) *
            100,
        );

        const goalValue =
          goal.id === activeGoal?.id
            ? percentageProgress
            : goal.achievedOn
            ? 100
            : 0;

        return (
          <section key={goal.id} className={styles.goalProgressContainer}>
            <progress
              className={styles.goalProgressIndicator}
              value={goalValue}
              max="100"
            ></progress>
            <Step isGoalAchieved={!!goal.achievedOn} />
            {showIndicator && <Indicator value={percentageProgress} />}
          </section>
        );
      })}
    </>
  );
};

export default GoalProgressIndicator;

type StepProps = {
  isGoalAchieved: boolean;
};

const Step = ({ isGoalAchieved }: StepProps) => (
  <div className={styles.stepsContainer}>
    <div
      className={classNames(styles.step, {
        [styles.stepEmpty]: !isGoalAchieved,
        [styles.stepAchieved]: isGoalAchieved,
      })}
    >
      {!isGoalAchieved && <Icon name="lock" className={styles.stepIcon} />}
    </div>
  </div>
);

type IndicatorProps = {
  value: number;
};

const Indicator = ({ value }: IndicatorProps) => (
  <span
    style={
      {
        "--percentage": `${value}`,
      } as any
    }
    className={styles.percentage}
  >
    {value}%
  </span>
);
