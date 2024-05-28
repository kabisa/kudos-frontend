import { FC, ReactNode } from "react";

import s from "./BasePage.module.css";

interface BasePageProps {
  children: ReactNode;
}

const BasePage: FC<BasePageProps> = ({ children }) => {
  return <div className={s.page}>{children}</div>;
};

export default BasePage;
