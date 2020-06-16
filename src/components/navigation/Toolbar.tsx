import React from 'react';
import { Button, Icon, Responsive } from 'semantic-ui-react';
import { History } from 'history';
import { Link, withRouter } from 'react-router-dom';
import s from './Toolbar.module.scss';

export interface Props {
  to?: string;
  text: string;
  history: History
}

function Toolbar(props: Props): React.ReactElement {
  const backLink = props.to ? (
    <Link to={props.to} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </Link>
  ) : (
    <Button icon onClick={() => props.history.goBack()} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </Button>
  );

  return (
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <div className={s.top_navigation}>
        {backLink}
        <span className={s.toolbar_text}>{props.text}</span>
      </div>
    </Responsive>
  );
}

// @ts-ignore
export default withRouter(Toolbar);
