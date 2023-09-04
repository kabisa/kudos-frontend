import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import {
  DELETE_GOAL,
  DeleteGoalParameters,
  GET_KUDOMETERS,
  Goal,
} from "../KudometerQueries";
import settings from "../../../../../config/settings";
import { Storage } from "../../../../../support/storage";
import { IconButton } from "@sandercamp/ui-components";

export interface GoalRowProps {
  key: string;
  goal: Goal;
  editGoal: (id: string, kudos: number, name: string) => void;
}

export function GoalRow(props: GoalRowProps): React.ReactElement {
  return (
    <tr key={props.goal.id}>
      <td>{props.goal.name}</td>
      <td>{props.goal.amount}</td>
      <td>
        <IconButton
          data-testid="edit-button"
          name="edit"
          onClick={() =>
            props.editGoal(props.goal.id, props.goal.amount, props.goal.name)
          }
        />
        <Mutation<DeleteGoalParameters>
          mutation={DELETE_GOAL}
          onCompleted={() => {
            toast.info("Goal removed successfully!");
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
            <IconButton
              variant="tertiary"
              name="delete"
              onClick={() =>
                deleteGoal({
                  variables: { id: props.goal.id },
                })
              }
              disabled={loading}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
}
