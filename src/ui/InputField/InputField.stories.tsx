import React from "react";
import InputField, { InputType } from ".";
import type { Meta } from "@storybook/react";

export const InputFieldStory = (props) => <InputField {...props} />;

const labels = {
  number: "Enter a number",
  text: "Enter some text",
  password: "Enter a password",
  email: "Enter an email",
};

const meta: Meta<typeof InputField> = {
  component: InputField,
  decorators: [
    (Story, props) => {
      props.args.label = labels[props.args.type];
      return <Story {...props.args} />;
    },
  ],
  argTypes: {
    label: {
      control: {
        type: false,
      },
    },
    id: {
      control: {
        type: false,
      },
    },
    type: {
      control: {
        type: "inline-radio",
      },
      options: InputType,
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    id: "input",
    type: "text",
    placeholder: "Placeholder",
  },
};

export default meta;
