const calculateProgress = (goals, current) => {
  const nextGoal = goals.find(goal => goal.amount > current);

  let percentage = 100;
  if (nextGoal) {
    percentage = ((current - nextGoal.amount) / nextGoal.amount) * 100 + 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
  }

  return percentage;
};

export default calculateProgress;