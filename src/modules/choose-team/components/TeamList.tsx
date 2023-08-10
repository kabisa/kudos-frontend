import React from "react";
import { gql } from "@apollo/client";

import { Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import TeamRow from "./TeamRow";
import settings from "../../../config/settings";
import { selectTeam } from "../utils";
import { PATH_FEED } from "../../../routes";
import { Storage } from "../../../support/storage";

export const GET_TEAMS = gql`
  query getTeams {
    viewer {
      memberships {
        id
        role
        team {
          id
          name
        }
      }
    }
  }
`;

export interface TeamResult {
  viewer: {
    memberships: {
      id: string;
      role: string;
      team: {
        id: string;
        name: string;
      };
    }[];
  };
}

function TeamList(): React.ReactElement {
  const history = useHistory();

  return (
    <Query<TeamResult>
      query={GET_TEAMS}
      pollInterval={2000}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) return <p className="text-center">Loading...</p>;
        if (error) return <p className="text-center">{error.message}</p>;

        if (!data || !data.viewer.memberships.length) {
          return <p className="text-center">No teams.</p>;
        }
        const { memberships } = data.viewer;

        if (memberships.length === 1) {
          if (!Storage.getItem(settings.TEAM_ID_TOKEN)) {
            selectTeam(memberships[0].team.id, memberships[0].role);
            history.push(PATH_FEED);
          }
        }

        return (
          <Grid columns={2} verticalAlign="middle">
            {memberships.map((membership) => (
              <TeamRow
                data-testid="kudo-teamivite"
                id={membership.team.id}
                name={membership.team.name}
                userRole={membership.role}
                key={membership.id}
              />
            ))}
          </Grid>
        );
      }}
    </Query>
  );
}

export default TeamList;
