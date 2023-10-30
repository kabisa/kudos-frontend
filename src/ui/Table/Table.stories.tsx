import Table, { TableProps } from ".";
import type { Meta } from "@storybook/react";
import { actionsTableData } from "./mockTableData";

type SimpleTableData = {
  name: string;
  kudos: number;
};

type ActionsTableData = {
  name: string;
  role: string;
  email: string;
  actions: JSX.Element;
};

const simpleTableData: SimpleTableData[] = [
  { name: "H", kudos: 1 },
  { name: "Help", kudos: 5 },
  { name: "Helpful", kudos: 10 },
  { name: "Super helpful", kudos: 20 },
  { name: "Mega helpful", kudos: 30 },
];

export const Simple = (props: TableProps<SimpleTableData>) => (
  <Table {...props} />
);

export const ActionsTable = (props: TableProps<ActionsTableData>) => (
  <Table {...props} />
);

Simple.args = {
  data: simpleTableData,
};

ActionsTable.args = {
  data: actionsTableData,
};

const meta: Meta<typeof Table> = {
  component: Table,
  argTypes: {
    data: { control: "object" },
  },
  args: {
    data: simpleTableData,
  },
};

export default meta;
