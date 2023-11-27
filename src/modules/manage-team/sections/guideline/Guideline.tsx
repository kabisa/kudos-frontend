import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import {
  DefaultContext,
  MutationFunction,
  OperationVariables,
  gql,
} from "@apollo/client";
import settings from "../../../../config/settings";
import { GET_GUIDELINES } from "./GuidelinesSection";
import { Storage } from "../../../../support/storage";
import { IconButton } from "@kabisa/ui-components";

export const DELETE_GUIDELINE = gql`
  mutation DeleteGuideline($id: ID!) {
    deleteGuideline(guidelineId: $id) {
      guidelineId
    }
  }
`;

export interface DeleteGuidelineParameters {
  id: number;
}

export interface GuidelineProps {
  key: number;
  id: number;
  kudos: number;
  name: string;
  editGuideline: (id: number, kudos: number, description: string) => void;
}

export function Guideline(props: GuidelineProps) {
  const showConfirmDialog = (
    deleteGuideline: MutationFunction<
      DeleteGuidelineParameters,
      OperationVariables,
      DefaultContext
    >,
  ) => {
    const result = window.confirm(
      "Are you sure you want to delete the guideline?",
    );
    if (result) {
      // TODO: rerender
      deleteGuideline({
        variables: { id: props.id },
      });
    }
  };

  return (
    <tr key={props.id}>
      <td>{props.kudos}</td>
      <td>{props.name}</td>
      <td>
        <IconButton
          variant="primary"
          name="edit"
          onClick={() => props.editGuideline(props.id, props.kudos, props.name)}
        />
        <Mutation<DeleteGuidelineParameters>
          mutation={DELETE_GUIDELINE}
          onCompleted={() => {
            toast.info("Guideline removed successfully!");
          }}
          refetchQueries={[
            {
              query: GET_GUIDELINES,
              variables: {
                team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
          ]}
        >
          {(deleteGuideline, { loading }) => (
            <IconButton
              variant="tertiary"
              name="delete"
              onClick={() => showConfirmDialog(deleteGuideline)}
              disabled={loading}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
}
