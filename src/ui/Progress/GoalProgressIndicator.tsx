import classNames from "classnames";
import styles from "./styles.module.css";
import { Icon } from "@sandercamp/ui-components";

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
  const goalsDisplay = [...goals].reverse();

  return (
    <>
      {goalsDisplay.map((goal: Goal) => {
        const activeGoal = goals.find((goal: Goal) => !goal.achievedOn);
        const showIndicator = activeGoal?.id === goal.id;

        const previousGoal =
          goals
            ?.slice()
            .reverse()
            .find((goal: Goal) => goal.achievedOn)?.amount || 0;

        const percentageProgress = Math.floor(
          ((activeKudosMeter.amount - previousGoal) /
            (activeGoal?.amount || 0 - previousGoal)) *
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
            <Step goal={goal} />
            {showIndicator && <Indicator value={percentageProgress} />}
          </section>
        );
      })}
    </>
  );
};

export default GoalProgressIndicator;

type StepProps = {
  goal: Goal;
};

const Step = ({ goal }: StepProps) => (
  <div className={styles.stepsContainer}>
    <div
      className={classNames(styles.step, {
        [styles.stepEmpty]: !goal.achievedOn,
        [styles.stepAchieved]: goal.achievedOn,
      })}
    >
      {!goal.achievedOn && <Icon name="lock" className={styles.stepIcon} />}
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
