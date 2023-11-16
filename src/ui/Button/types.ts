export const GenericButtonVariants = [
  "primary",
  "secondary",
  "tertiary",
] as const;
export const AppButtonVariants = ["like"] as const;

export type GenericButtonVariant = (typeof GenericButtonVariants)[number];
export type AppButtonVariant = (typeof AppButtonVariants)[number];
export type ButtonVariant = GenericButtonVariant | AppButtonVariant;
