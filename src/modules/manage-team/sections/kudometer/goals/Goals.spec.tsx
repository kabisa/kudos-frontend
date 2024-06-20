import { Goals } from "./Goals";
import { Goal, Kudometer } from "../KudometerQueries";
import { screen } from "@testing-library/react";
import {
  makeFC,
  setComponent,
} from "../../../../../support/testing/testComponent";
import { applicationContext } from "../../../../../support/testing/testContexts";

const goals: Goal[] = [
  {
    id: "1",
    name: "Hapje eten",
    amount: 100,
  },
  {
    id: "2",
    name: "Bowlen",
    amount: 200,
  },
  {
    id: "3",
    name: "Reisje naar hawaii",
    amount: 300,
  },
];

const kudometer: Kudometer = {
  goals,
  id: "1",
  name: "First kudometer",
};

describe("<Goals />", () => {
  const { setProps, renderComponent } = setComponent(
    makeFC(Goals),
    applicationContext(),
  );
  setProps({ kudometer });

  beforeEach(() => {
    renderComponent();
  });

  it("renders the add goal section", () => {
    expect(
      screen.getByRole("button", { name: "Create goal" }),
    ).toBeInTheDocument();
  });

  it("renders the kudometer name", () => {
    const expected = "Goals for First kudometer";
    expect(
      screen.getByRole("heading", { name: expected, level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders a row for each goal", () => {
    // 1 header row, 3 data rows
    expect(screen.getAllByRole("row")).toHaveLength(4);
  });
});
