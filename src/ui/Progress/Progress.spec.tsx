import { render } from "@testing-library/react";
import { KudosProgress } from ".";

test("displays progress information when provided with currentKudos, neededKudos, and goal", () => {
  const { getByText } = render(
    <KudosProgress
      percent={50}
      currentKudos={25}
      neededKudos={50}
      goal="Test Goal"
    />,
  );

  getByText("25₭");
  getByText("of 50₭ for Test Goal");
});
