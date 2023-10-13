import Card from ".";
import type { Meta } from "@storybook/react";

export const CardStory = ({ ...props }) => <Card {...props}>Card</Card>;

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {},
  args: {
    children: "hello there",
  },
};

export default meta;
