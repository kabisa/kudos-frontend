import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import settings from "../../../../config/settings";
import { EditGuideline } from "./EditGuideline";
import { Guideline } from "./Guideline";
import { Storage } from "../../../../support/storage";
import { Icon } from "@sandercamp/ui-components";

export const CREATE_GUIDELINE = gql`
  mutation CreateGuideline($name: String!, $kudos: Int!, $team_id: ID!) {
    createGuideline(name: $name, kudos: $kudos, teamId: $team_id) {
      guideline {
        id
      }
    }
  }
`;

export const UPDATE_GUIDELINE = gql`
  mutation UpdateGuideline($guideline: ID!, $name: String!, $kudos: Int!) {
    updateGuideline(guidelineId: $guideline, name: $name, kudos: $kudos) {
      guideline {
        id
      }
    }
  }
`;

export const GET_GUIDELINES = gql`
  query Guidelines($team_id: ID!) {
    teamById(id: $team_id) {
      guidelines {
        id
        kudos
        name
      }
    }
  }
`;

export interface CreateGuidelineParameters {
  name: string;
  kudos: number;
  team_id: string;
}

export interface UpdateGuidelineParameters {
  guideline: string;
  name: string;
  kudos: number;
}

export interface GetGuidelinesResult {
  teamById: {
    guidelines: {
      id: number;
      kudos: number;
      name: string;
    }[];
  };
}

export interface Props {}

export interface State {}

class GuidelineSection extends Component<Props, State> {
  initialState: State;

  editGuidelineRef: React.RefObject<EditGuideline>;

  constructor(props: Props) {
    super(props);

    this.initialState = this.state;
    this.editGuidelineRef = React.createRef();

    this.editGuideline = this.editGuideline.bind(this);
  }

  editGuideline(id: number, kudos: number, description: string) {
    if (this.editGuidelineRef.current !== null) {
      this.editGuidelineRef.current.setEditState(
        id,
        String(kudos),
        description,
      );
    }

    const container = document.getElementById("management-container");

    if (container) {
      container.scrollIntoView();
    }
  }

  render() {
    return (
      <>
        <h2>
          <Icon name="steps" />
          Guidelines
        </h2>
        <EditGuideline ref={this.editGuidelineRef} />
        <Query<GetGuidelinesResult>
          query={GET_GUIDELINES}
          variables={{ team_id: Storage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! {error.message}</p>;

            if (!data || !data.teamById) {
              return <p>No guidelines available</p>;
            }
            return (
              <table>
                <thead>
                  <tr>
                    <th>Kudos</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.teamById.guidelines.map((item) => (
                    <Guideline
                      data-testid="guideline-row"
                      key={item.id}
                      id={item.id}
                      kudos={item.kudos}
                      name={item.name}
                      editGuideline={this.editGuideline}
                    />
                  ))}
                </tbody>
              </table>
            );
          }}
        </Query>
      </>
    );
  }
}

export default GuidelineSection;
