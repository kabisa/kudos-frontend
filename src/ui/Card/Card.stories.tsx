import { SecondaryCard, Card } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  argTypes: {
    theme: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    title: {
      text: "Title",
      iconName: "flag",
    },
    description: "Title",
    content: (
      <div>
        This is a long string that can fit inside a small card. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Integer sollicitudin, enim
        at eleifend lacinia, diam nulla accumsan elit, id dignissim lectus felis
        ornare purus. Pellentesque nec mauris nisl.
      </div>
    ),
    footer: "footer",
    center: false,
  },
  render: (args) => (
    <Card
      theme="light"
      title={args.title}
      description={args.description}
      content={args.content}
      footer={args.footer}
      center={args.center}
    />
  ),
};

export const PrimaryDark: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <Card
      theme="dark"
      title={args.title}
      description={args.description}
      content={args.content}
      footer={args.footer}
      center={args.center}
    />
  ),
};

export const Secondary: Story = {
  argTypes: {
    theme: {
      table: {
        disable: true,
      },
    },
    center: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <SecondaryCard
      title={args.title}
      description={args.description}
      content={args.content}
      footer={args.footer}
    />
  ),
};
