import React from "react";
import { Icon, Responsive } from "semantic-ui-react";

import s from "./Toolbar.module.scss";

export interface Props {
  to?: string,
  text: string
}

const Toolbar: React.FC<Props> = (props) => {
  const backLink = props.to ? (
    <a href={props.to} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </a>
  ) : (
      // eslint-disable-next-line no-restricted-globals
    <div onClick={() => history.back()} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </div>
  );

  return (
    <div>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <div className={s.top_navigation}>
          {backLink}
          <span className={s.toolbar_text}>{props.text}</span>
        </div>
      </Responsive>
    </div>
  );
};

export default Toolbar;