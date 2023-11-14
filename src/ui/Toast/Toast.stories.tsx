import { ToastWrapper, toast } from "./";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof ToastWrapper> = {
  component: ToastWrapper,
  argTypes: {},
};

export const Default = ({ text }: { text: string }) => {
  return (
    <>
      <ToastWrapper />
      <button
        onClick={() =>
          toast.info(text[Math.floor(Math.random() * text.length - 1)])
        }
      >
        Get me a "toastje!"
      </button>
    </>
  );
};

Default.args = {
  text: [
    "Toastje met kaas",
    "Toastje met zalm",
    "Gewoon droog",
    "Toast op een volle Kudometer!",
  ],
};

export default meta;
