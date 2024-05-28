import { Goal } from "../modules/manage-team/sections/kudometer/KudometerQueries";

const calculateProgress = (
  goals: Goal[],
  current: number,
  scale = 100,
): number => {
  goals.sort((goal1, goal2) => goal1.amount - goal2.amount);
  let nextGoal;
  let previousGoalAmount;
  if (Array.isArray(goals)) {
    nextGoal = goals.find((goal) => goal.amount > current);
    previousGoalAmount = [...goals]
      .reverse()
      .find((goal) => goal.amount <= current)?.amount;
  } else {
    nextGoal = goals;
    previousGoalAmount = 0;
  }

  let percentage = scale;
  let currentNumber = current;
  if (nextGoal) {
    if (previousGoalAmount) {
      currentNumber -= previousGoalAmount;
      const next = nextGoal.amount - previousGoalAmount;

      percentage = ((currentNumber - next) / next) * scale + scale;
    } else {
      percentage =
        ((currentNumber - nextGoal.amount) / nextGoal.amount) * scale + scale;
    }
    if (percentage < 0) percentage = 0;
    if (percentage > scale) percentage = scale;
  }

  return Math.round(percentage);
};

export default calculateProgress;
