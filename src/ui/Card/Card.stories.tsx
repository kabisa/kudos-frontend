import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from ".";
import type { Meta } from "@storybook/react";

export const Default = ({ ...props }) => (
  <Card {...props}>
    <CardHeader>
      <CardTitle>Card</CardTitle>
      <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
  </Card>
);

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {
    theme: {
      control: {
        type: "inline-radio",
      },
      options: ["light", "dark"],
    },
  },
  args: {
    theme: "light",
  },
};

export default meta;
