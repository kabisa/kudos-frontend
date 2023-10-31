import { render } from "@testing-library/react";
import KudosProgress from ".";

test("renders the kudo progress component in loading state", () => {
  const { getByText } = render(<KudosProgress data={{ state: "loading" }} />);
  getByText(/loading/i);
});

test("renders the kudo progress component in error state", () => {
  const { getByText } = render(
    <KudosProgress
      data={{
        state: "error",
        error: "Unexpected errors always occur unexpectedly.",
      }}
    />,
  );
  getByText(/Error!/i);
  getByText(/unexpected errors always occur unexpectedly/i);
});

test("renders the kudo progress component in success state", () => {
  const { getByText } = render(
    <KudosProgress
      data={{
        state: "success",
        currentKudos: 25,
        neededKudos: 50,
        goal: "Enchanted Dreams",
      }}
    />,
  );
  getByText(/25/i);
  getByText(/of/i);
  getByText(/50/i);
  getByText(/for/i);
  getByText(/enchanted dreams/i);
});
