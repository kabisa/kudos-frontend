import React, { ReactElement } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import { Toolbar } from './navigation';

import s from './FormWrapper.module.scss';

export interface Props {
  children: ReactElement;
  toolbar?: string;
  header: string;
  verticalCentered?: boolean
}

// TODO fix vertical alignment on mobile
export function FormWrapper(props: Props) {
  return (
    <div>
      {props.toolbar && <Toolbar text={props.toolbar} />}
      <div className={`main-form ${props.toolbar ? 'main-form-toolbar' : ''}`}>
        <Grid textAlign="center" className={s.grid} verticalAlign={props.verticalCentered ? 'middle' : undefined}>
          <Grid.Column className={s.column}>
            <Header as="h2" textAlign="center" className={s.header}>
              {props.header}
            </Header>
            {props.children}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}
