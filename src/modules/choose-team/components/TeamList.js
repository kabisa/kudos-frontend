import { h } from "preact";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import TeamRow from "./TeamRow";
import settings from "../../../config/settings";
import { selectTeam } from "../utils";

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

const TeamList = () => (
  <Query query={GET_TEAMS} pollInterval={2000} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
      if (error) return <p style={{ textAlign: "center" }} />;
      const memberships = data.viewer.memberships;
      if (!memberships.length) {
        return <p style={{ textAlign: "center" }}>No teams.</p>;
      }

      if (memberships.length === 1) {
        if (!localStorage.getItem(settings.TEAM_ID_TOKEN)) {
          selectTeam(memberships[0].team.id, memberships[0].role);
          return;
        }
      }

      return (
        <div>
          {memberships.map(membership => (
            <TeamRow
              id={membership.team.id}
              name={membership.team.name}
              role={membership.role}
              key={membership.id}
            />
          ))}
        </div>
      );
    }}
  </Query>
);

export default TeamList;
