import React from "react";
import { Button, Popup, Table } from "semantic-ui-react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import { gql } from "@apollo/client";
import settings from "../../../../config/settings";
import { GET_GUIDELINES } from "./GuidelinesSection";
import { Storage } from "../../../../support/storage";

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

export function Guideline(props: GuidelineProps): React.ReactElement {
  return (
    <Table.Row key={props.id}>
      <Table.Cell>{props.kudos}</Table.Cell>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>
        <Button
          data-testid="edit-button"
          color="blue"
          icon="pencil"
          size="tiny"
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
                    deleteGuideline({
                      variables: { id: props.id },
                    });
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
