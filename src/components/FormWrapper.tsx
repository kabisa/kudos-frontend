import React, { ReactElement } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import { Toolbar } from './navigation';

import s from './FormWrapper.module.scss';

export interface Props {
  children: ReactElement;
  toolbar?: string;
  header: string;
}

export function FormWrapper(props: Props) {
  return (
    <div>
      {props.toolbar && <Toolbar text={props.toolbar} />}
      <div className="main-form">
        <Grid textAlign="center" className={s.grid} verticalAlign="middle" style={{ height: '100%' }}>
          <Grid.Column className={s.column}>
            <Header as="h2" color="blue" textAlign="center">
              {props.header}
            </Header>
            {props.children}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}
