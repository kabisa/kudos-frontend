import React from 'react';
import { Grid, Header } from "semantic-ui-react";

import { Toolbar } from "./navigation";

import s from "./FormWrapper.scss";

export const FormWrapper = ({ children, toolbar, header }) => (
  <div>
    {toolbar && <Toolbar text={toolbar} />}
    <div className="main-form">
      <Grid
        textAlign="center"
        className={s.grid}
        verticalAlign="middle"
        style={{ height: "100%" }}
      >
        <Grid.Column className={s.column}>
          <Header as="h2" color="blue" textAlign="center">
            {header}
          </Header>
          {children}
        </Grid.Column>
      </Grid>
    </div>
  </div>
);
