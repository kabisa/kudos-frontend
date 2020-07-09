import React from 'react';
import { Button, Popup, Table } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import {
  DELETE_GOAL, DeleteGoalParameters, GET_KUDOMETERS, Goal,
} from '../KudometerQueries';
import settings from '../../../../../config/settings';
import { Storage } from '../../../../../support/storage';

export interface GoalRowProps {
  key: string,
  goal: Goal
  editGoal: (id: string, kudos: number, name: string) => void
}

export function GoalRow(props: GoalRowProps): React.ReactElement {
  return (
    <Table.Row key={props.goal.id}>
      <Table.Cell>{props.goal.name}</Table.Cell>
      <Table.Cell>{props.goal.amount}</Table.Cell>
      <Table.Cell>
        <Button
          data-testid="edit-button"
          color="yellow"
          icon="pencil"
          size="tiny"
          onClick={() => props.editGoal(
            props.goal.id,
            props.goal.amount,
            props.goal.name,
          )}
        />
        <Mutation<DeleteGoalParameters>
          mutation={DELETE_GOAL}
          onCompleted={() => {
            toast.info('Goal removed successfully!');
          }}
          refetchQueries={[
            {
              query: GET_KUDOMETERS,
              variables: {
                team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
          ]}
        >
          {(deleteGoal, { loading }) => (
            <Popup
              trigger={
                <Button data-testid="delete-button" size="tiny" color="red" loading={loading} icon="trash" />
              }
              content={(
                <Button
                  data-testid="confirm-delete-button"
                  color="red"
                  content="Confirm deletion"
                  onClick={() => {
                    deleteGoal({
                      variables: { id: props.goal.id },
                    });
                  }}
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
