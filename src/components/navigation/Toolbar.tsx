import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import s from "./Toolbar.module.scss";
import { Media } from "../../support/breakpoints";

export interface Props {
  to?: string;
  text: string;
}

export default function Toolbar(props: Props) {
  const history = useHistory();

  const backLink = props.to ? (
    <Link to={props.to} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </Link>
  ) : (
    <Button icon onClick={() => history.goBack()} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </Button>
  );

  return (
    <Media lessThan="computer">
      <div className={s.top_navigation}>
        {backLink}
        <span className={s.toolbar_text}>{props.text}</span>
      </div>
    </Media>
  );
}
