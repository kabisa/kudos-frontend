export const createGoal = (
  name: string,
  amount: number,
  achievedOn: string | null,
) => ({
  id: Math.floor(Math.random() * 100).toString(),
  name,
  amount,
  achievedOn,
});
