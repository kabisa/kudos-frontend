import Table, { DataTable, TableProps } from ".";
import type { Meta, StoryFn } from "@storybook/react";
import Button from "../Button";

const simpleTableData = [
  { name: "H", kudos: 1 },
  { name: "Help", kudos: 5 },
  { name: "Helpful", kudos: 10 },
  { name: "Super helpful", kudos: 20 },
  { name: "Mega helpful", kudos: 30 },
];

export const actionsTableData = [
  {
    name: "Mumbo-Jumbo",
    role: "moderator",
    email: "mumbo@jumbo.com",
    actions: (
      <>
        <Button variant="primary" icon="arrow_upward" />
        <Button variant="primary" icon="arrow_downward" />
        <Button variant="tertiary" icon="delete" />
      </>
    ),
  },
  {
    name: "Nabnut",
    role: "moderator",
    email: "nabnut@clickclockwood.com",
    actions: (
      <>
        <Button variant="primary" icon="arrow_upward" state="disabled" />
        <Button variant="primary" icon="arrow_downward" />
        <Button variant="tertiary" icon="delete" />
      </>
    ),
  },
  {
    name: "Jolly Roger",
    role: "admin",
    email: "jollyroger@lagoon.com",
    actions: <></>,
  },
];

const Template: StoryFn<TableProps<DataTable>> = (props) => (
  <Table {...props} />
);

export const Simple: StoryFn<TableProps<DataTable>> = Template.bind({});
export const ActionsTable: StoryFn<TableProps<DataTable>> = Template.bind({});

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