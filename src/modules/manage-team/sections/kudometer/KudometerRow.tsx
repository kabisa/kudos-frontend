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
import { Button, IconButton } from "@kabisa/ui-components";

export interface KudometerRowProps {
  key: string;
  kudometer: Kudometer;
  viewButtonClickHandler: (kudometer: Kudometer) => void;
  deleteKudometerHandler: (id: string) => void;
  edit: (kudometer: Kudometer) => void;
}

export function KudometerRow(props: KudometerRowProps) {
  function deleteKudometer(mutation: any) {
    const { id } = props.kudometer;
    if (global.confirm("Are you sure you want to delete this kudometer?")) {
      mutation({ variables: { id } });

      props.deleteKudometerHandler(id);
    }
  }

  function setActiveKudometer(mutation: any) {
    const { id } = props.kudometer;
    const teamId = Storage.getItem(settings.TEAM_ID_TOKEN);

    mutation({ variables: { team_id: teamId, kudos_meter_id: id } });
  }

  return (
    <tr key={props.kudometer.id}>
      <td>{props.kudometer.name}</td>
      <td>
        <Button
          data-testid="goal-button"
          variant="primary"
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
              variant="primary"
              disabled={props.kudometer.isActive || loading}
              onClick={() => {
                setActiveKudometer(mutation);
              }}
            >
              {props.kudometer.isActive ? "Already active" : "Set as active"}
            </Button>
          )}
        </Mutation>
      </td>
      <td>
        <IconButton
          data-testid="edit-button"
          name="edit"
          onClick={() => {
            props.edit(props.kudometer);
          }}
        />
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
            <IconButton
              variant="tertiary"
              name="delete"
              onClick={() => deleteKudometer(mutation)}
              disabled={loading}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
}
