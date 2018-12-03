const calculateProgress = (goals, current, scale = 100) => {
  goals = goals.sort((goal1, goal2) => goal1.amount - goal2.amount);
  let nextGoal;
  let previousGoal;
  if (Array.isArray(goals)) {
    nextGoal = goals.find(goal => goal.amount > current);
    previousGoal = goals.reverse().find(goal => goal.amount <= current);
  } else {
    nextGoal = goals;
    previousGoal = 0;
  }

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
