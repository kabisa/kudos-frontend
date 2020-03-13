import React from 'react';
import { Button, Icon, Responsive } from 'semantic-ui-react';

import s from './Toolbar.module.scss';

export interface Props {
  to?: string;
  text: string;
}

function Toolbar(props: Props): React.ReactElement {
  const backLink = props.to ? (
    <a href={props.to} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </a>
  ) : (
  // eslint-disable-next-line no-restricted-globals
    <Button icon onClick={() => history.back()} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </Button>
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
}

export default Toolbar;
