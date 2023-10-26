import { render } from "@testing-library/react";
import KudosProgress from ".";

test("displays progress information when provided with currentKudos, neededKudos, and goal", () => {
  const { getByText } = render(
    <KudosProgress
      percent={50}
      currentKudos={25}
      neededKudos={50}
      goal="Test Goal"
    />,
  );

  expect(getByText("25")).toBeInTheDocument();
  expect(getByText("of 50₭ for Test Goal")).toBeInTheDocument();
});

test("displays only the progress circle when currentKudos is not provided", () => {
  const { queryByText } = render(<KudosProgress percent={75} />);
  expect(queryByText("₭")).toBeNull();
  expect(queryByText("for")).toBeNull();
});
