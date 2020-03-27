import React from 'react';
import { Button, Popup, Table } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import {
  DELETE_KUDOMETER, DeleteKudometerParameters, GET_KUDOMETERS, Kudometer,
} from './KudometerQuerries';
import settings from '../../../../config/settings';

export interface KudometerRowProps {
  key: string,
  kudometer: Kudometer,
  viewButtonClickHandler: (kudometer: Kudometer) => void;
  deleteKudometerHandler: (id: string) => void;
}

export function KudometerRow(props: KudometerRowProps): React.ReactElement {
  function deleteKudometer(mutation: any) {
    const { id } = props.kudometer;
    mutation({ variables: { id } });

    props.deleteKudometerHandler(id);
  }

  return (
    <Table.Row key={props.kudometer.id}>
      <Table.Cell>{props.kudometer.name}</Table.Cell>
      <Table.Cell>
        <Button
          data-testid="goal-button"
          color="blue"
          size="tiny"
          onClick={() => props.viewButtonClickHandler(props.kudometer)}
        >
          View goals
        </Button>
        <Mutation<DeleteKudometerParameters>
          mutation={DELETE_KUDOMETER}
          onCompleted={() => {
            toast.info('Kudometer removed successfully!');
          }}
          refetchQueries={[
            {
              query: GET_KUDOMETERS,
              variables: {
                team_id: localStorage.getItem(
                  settings.TEAM_ID_TOKEN,
                ),
              },
            },
          ]}
        >
          {(mutation, { loading }) => (
            <Popup
              trigger={
                <Button data-testid="delete-button" size="tiny" color="red" loading={loading} icon="trash" />
                            }
              content={(
                <Button
                  data-testid="confirm-delete-button"
                  color="red"
                  content="Confirm deletion"
                  onClick={() => { deleteKudometer(mutation); }}
                />
                            )}
              on="click"
              position="top right"
            />
          )}
        </Mutation>
      </Table.Cell>
    </Table.Row>
  );
}
