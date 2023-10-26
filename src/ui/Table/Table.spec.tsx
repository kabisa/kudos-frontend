import { render } from "@testing-library/react";
import Table from ".";
import { actionsTableData } from "./Table.stories";

test("given the data, it renders the amount of columns and uses the keys as header names", () => {
  const { getByText } = render(<Table data={actionsTableData} />);

  getByText("name");
  getByText("role");
  getByText("email");
  getByText("actions");
});

test("given the data, it renders the amount of headers and columns", () => {
  const { getAllByRole } = render(<Table data={actionsTableData} />);

  const tableHeaderElements = getAllByRole("columnheader");
  const tableDataCells = getAllByRole("cell");

  expect(tableHeaderElements).toHaveLength(4);
  expect(tableDataCells).toHaveLength(12);
});

test("given no data, it renders nothing", () => {
  const { container } = render(<Table data={[]} />);
  expect(container).toBeEmptyDOMElement();
});
