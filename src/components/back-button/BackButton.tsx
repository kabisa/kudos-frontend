import React from 'react';
import { Button, Responsive } from 'semantic-ui-react';
import { History } from 'history';
import { withRouter } from 'react-router-dom';
import s from '../../modules/login/LoginPage.module.scss';

export interface Props {
  history: History;
}

function BackButton(props: Props) {
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Button fluid size="large" className={s.back} onClick={() => props.history.goBack()}>
        Back
      </Button>
    </Responsive>
  );
}

export default withRouter(BackButton);
