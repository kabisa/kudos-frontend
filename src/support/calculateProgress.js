const calculateProgress = (goals, current) => {
  let nextGoal;
  if (Array.isArray(goals)) {
    nextGoal = goals.find(goal => goal.amount > current);
  } else {
    nextGoal = goals;
  }

  let percentage = 100;
  if (nextGoal) {
    percentage = ((current - nextGoal.amount) / nextGoal.amount) * 100 + 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
  }

  return parseFloat(percentage).toFixed(1);
};

export default calculateProgress;
