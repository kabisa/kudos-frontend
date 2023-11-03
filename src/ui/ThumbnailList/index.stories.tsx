import type { Meta, StoryObj } from "@storybook/react";

import ThumbnailList from ".";

const meta: Meta<typeof ThumbnailList> = {
    component: ThumbnailList,
};

type Story = StoryObj<typeof ThumbnailList>;

export const Default: Story = {
    args: {
        thumbnails: [
            {
                src: 'assets/logo-512x512.png',
                alt: 'preview'
            },
            {
                src: 'assets/logo-512x512.png',
                alt: 'preview'
            },
            {
                src: 'assets/logo-512x512.png',
                alt: 'preview'
            }
        ]
    },
    render: (args) => <ThumbnailList { ...args } />,
};

export default meta;
