import React from "react";
import { Button, Popup, Table } from "semantic-ui-react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import {
  DELETE_KUDOMETER,
  DeleteKudometerParameters,
  GET_KUDOMETERS,
  Kudometer,
  SET_ACTIVE_KUDOS_METER,
  SetActiveKudosMeterParameters,
  SetActiveKudosMeterResult,
} from "./KudometerQueries";
import settings from "../../../../config/settings";
import { Storage } from "../../../../support/storage";
import { GET_GOAL_PERCENTAGE } from "../../../feed/queries";

export interface KudometerRowProps {
  key: string;
  kudometer: Kudometer;
  viewButtonClickHandler: (kudometer: Kudometer) => void;
  deleteKudometerHandler: (id: string) => void;
  edit: (kudometer: Kudometer) => void;
}

export function KudometerRow(props: KudometerRowProps): React.ReactElement {
  function deleteKudometer(mutation: any) {
    const { id } = props.kudometer;
    mutation({ variables: { id } });

    props.deleteKudometerHandler(id);
  }

  function setActiveKudometer(mutation: any) {
    const { id } = props.kudometer;
    const teamId = Storage.getItem(settings.TEAM_ID_TOKEN);

    mutation({ variables: { team_id: teamId, kudos_meter_id: id } });
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
        <Mutation<SetActiveKudosMeterResult, SetActiveKudosMeterParameters>
          mutation={SET_ACTIVE_KUDOS_METER}
          onCompleted={() => {
            toast.info("Kudometer is now active!");
          }}
          refetchQueries={[
            {
              query: GET_KUDOMETERS,
              variables: {
                team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
            {
              query: GET_GOAL_PERCENTAGE,
              variables: {
                team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
          ]}
        >
          {(mutation, { loading }) => (
            <Button
              data-testid="set-active-button"
              color="yellow"
              size="tiny"
              loading={loading}
              disabled={props.kudometer.isActive}
              onClick={() => {
                setActiveKudometer(mutation);
              }}
            >
              {props.kudometer.isActive ? "Already active" : "Set as active"}
            </Button>
          )}
        </Mutation>
        <Button
          data-testid="edit-button"
          color="yellow"
          size="tiny"
          icon="pencil"
          onClick={() => {
            props.edit(props.kudometer);
          }}
        />
      </Table.Cell>
      <Table.Cell>
        <Mutation<DeleteKudometerParameters>
          mutation={DELETE_KUDOMETER}
          onCompleted={() => {
            toast.info("Kudometer removed successfully!");
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
          {(mutation, { loading }) => (
            <Popup
              trigger={
                <Button
                  data-testid="delete-button"
                  size="tiny"
                  color="red"
                  loading={loading}
                  icon="trash"
                />
              }
              content={
                <Button
                  data-testid="confirm-delete-button"
                  color="red"
                  content="Confirm deletion"
                  onClick={() => {
                    deleteKudometer(mutation);
                  }}
                />
              }
              on="click"
              position="top right"
            />
          )}
        </Mutation>
      </Table.Cell>
    </Table.Row>
  );
}
