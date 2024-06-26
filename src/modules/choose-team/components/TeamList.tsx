import { gql } from "@apollo/client";
import s from "./ChooseTeam.module.scss";

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

function TeamList() {
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
          <div className={s.teamList} data-testid="kudo-team-invites">
            {memberships.map((membership) => (
              <TeamRow
                data-testid="kudo-teaminvite"
                id={membership.team.id}
                name={membership.team.name}
                userRole={membership.role}
                key={membership.id}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
}

export default TeamList;
