import type { Meta, StoryObj } from "@storybook/react";

import Thumbnail from ".";

const meta: Meta<typeof Thumbnail> = {
    component: Thumbnail,
};

type Story = StoryObj<typeof Thumbnail>;

export const Default: Story = {
    args: {
        src: 'assets/logo-512x512.png',
        alt: 'preview'
    },
    render: (args) => <Thumbnail {...args} />,
};

export default meta;
