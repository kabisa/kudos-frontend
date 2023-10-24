import { Card, CardProps, SecondaryCard } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const CardComponent = (props: CardProps) => <Card {...props} />;
const SecondaryCardComponent = (props: CardProps) => (
  <div style={{ width: "400px" }}>
    <SecondaryCard {...props} />
  </div>
);

const meta: Meta<typeof Card> = {
  component: CardComponent,
  title: "ui/Card",
  args: {
    title: {
      text: "Report",
      iconName: "flag",
    },
    content: (
      <div>
        Banjo-Kazooie is the first game in the Banjo-Kazooie series. It was
        developed by Rare and released in 1998 for the Nintendo 64. In this
        game,
      </div>
    ),
    footer: <footer>Footer content</footer>,
  },
  argTypes: {
    theme: {
      control: {
        type: "inline-radio",
        options: ["light", "dark"],
      },
      defaultValue: "light",
    },
  },
};

export const Default: StoryObj<typeof Card> = CardComponent.bind({});
export const Secondary: StoryObj<typeof Card> = SecondaryCardComponent.bind({});

Secondary.args = {
  center: true,
  title: {
    text: "Kudometer",
  },
  date: "13th of May 1991",
  description: "This is a description",
};
export default meta;
