import React from "react";
import InputField, { InputFieldProps, InputType } from ".";
import type { Meta } from "@storybook/react";

export const InputFieldStory = (props: InputFieldProps) => (
  <InputField {...props} />
);

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
      if (props.args.elementType === "input") {
        props.args.label = labels[props.args.type || "text"];
        props.args.placeholder = labels[props.args.type || "text"];
      } else {
        props.args.label = "Enter some text";
        props.args.placeholder = "Enter some text";
      }

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
    elementType: "input",
    placeholder: "Placeholder",
  },
};

export default meta;
