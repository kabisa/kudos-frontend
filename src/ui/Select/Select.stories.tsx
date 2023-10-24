import { action } from "@storybook/addon-actions";
import SelectWrapper from ".";
import { Meta } from "@storybook/react";

const meta: Meta<typeof SelectWrapper> = {
  component: SelectWrapper,
};

export default meta;

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export const SingleSelect = () => (
  <div style={{ width: "400px" }}>
    <SelectWrapper
      label="Fruit"
      options={options}
      onChange={action("Selected")}
      placeholder="Select a fruit"
    />
  </div>
);

export const MultiSelect = () => (
  <div style={{ width: "400px" }}>
    <SelectWrapper
      label="Fruits"
      options={options}
      isMulti
      onChange={action("Selected")}
      placeholder="Select fruits"
    />
  </div>
);
