import React from 'react';
import { Button, GridColumn, GridRow } from 'semantic-ui-react';
import { History } from 'history';
import s from './ChooseTeam.module.scss';
import { selectTeam } from '../utils';
import { PATH_FEED } from '../../../routes';

export interface Props {
  history: History;
  id: string;
  name: string;
  userRole: string;
}

function TeamRow(props: Props) {
  return (
    <GridRow textAlign="center">
      <GridColumn>
        <p className={s.text}>{props.name}</p>
      </GridColumn>
      <GridColumn>
        <Button
          color="green"
          size="small"
          onClick={() => {
            selectTeam(props.id, props.userRole);
            props.history.push(PATH_FEED);
          }}
        >
          Choose
        </Button>
      </GridColumn>
    </GridRow>
  );
}

export default TeamRow;
