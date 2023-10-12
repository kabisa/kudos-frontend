import React from "react";
import Button from "./";
import type { Meta } from "@storybook/react";

export const ButtonStory = () => (
  <Button variant="primary" text="Hello Button" />
);

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
