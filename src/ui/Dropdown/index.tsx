import { DropdownMenu, Icon, MenuItem } from "@sandercamp/ui-components";
import { ReactNode } from "react";
import styles from "./styles.module.css";

import "./dropdown.css";

type DropdownMenuItemProps = {
  label: string;
  iconName?: string;
};

const DropdownMenuItem = ({ label, iconName }: DropdownMenuItemProps) => {
  return (
    <MenuItem className={styles.menuItem}>
      {iconName && <Icon name={iconName} className={styles.icon} />}
      {label}
    </MenuItem>
  );
};

type DropdownProps = {
  label: string;
  children: ReactNode;
};

const Dropdown = ({ label, children }: DropdownProps) => {
  return (
    <DropdownMenu direction="bottom" text={label}>
      {children}
    </DropdownMenu>
  );
};

export { Dropdown, DropdownMenuItem };
