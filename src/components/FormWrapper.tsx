import { ReactElement } from "react";

import { Toolbar } from "./navigation";

import s from "./FormWrapper.module.css";
import classNames from "classnames";

export interface Props {
  children: ReactElement;
  toolbar?: string;
  header: string;
  verticalCentered?: boolean;
}

export function FormWrapper(props: Props) {
  return (
    <div className={s.wrapper}>
      <div className={s.form_wrapper}>
        <div
          className={classNames(s.header, {
            [s.center]: props.toolbar,
          })}
        >
          {props.toolbar && <Toolbar text={props.toolbar} />}
          <h1>{props.header}</h1>
        </div>

        {props.children}
      </div>
    </div>
  );
}
