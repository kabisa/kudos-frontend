import { ComponentProps } from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "@kabisa/ui-components/src/atoms/Link/index.module.css";

export type Props = ComponentProps<typeof RouterLink> & {
  theme: "light" | "dark";
};

export const Link: React.FC<Props> = ({ theme, children, ...props }: Props) => {
  return (
    <RouterLink
      {...props}
      className={`${props.className} ${styles.link} ${styles[theme]}`}
    >
      {children}
    </RouterLink>
  );
};
