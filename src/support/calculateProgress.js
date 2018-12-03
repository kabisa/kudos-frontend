const calculateProgress = (goals, current, scale = 100) => {
  let nextGoal;
  let previousGoal;
  if (Array.isArray(goals)) {
    nextGoal = goals.find(goal => goal.amount > current);
    goals.map(goal => {
      if (!previousGoal && goal.amount <= current) {
        previousGoal = goal;
      }
      if (previousGoal) {
        if (goal.amount <= current && previousGoal.amount < goal.amount) {
          previousGoal = goal;
        }
      }
    });
  } else {
    nextGoal = goals;
    previousGoal = 0;
  }
  console.log({ nextGoal, previousGoal });

  let percentage = scale;
  if (nextGoal) {
    if (previousGoal) {
      current = current - previousGoal.amount;
      let next = nextGoal.amount - previousGoal.amount;

      percentage = ((current - next) / next) * scale + scale;
    } else {
      percentage =
        ((current - nextGoal.amount) / nextGoal.amount) * scale + scale;
    }
    if (percentage < 0) percentage = 0;
    if (percentage > scale) percentage = scale;
  }

  return parseFloat(percentage).toFixed(1);
};

export default calculateProgress;
