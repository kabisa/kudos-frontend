import React from 'react';
import gql from 'graphql-tag';

import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Query } from '@apollo/react-components';
import TeamRow from './TeamRow';
import settings from '../../../config/settings';
import { selectTeam } from '../utils';
import { PATH_FEED } from '../../../routes';

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

export interface Props {
  history: History;
}

function TeamList(props: Props): React.ReactElement {
  return (
    <Query<TeamResult> query={GET_TEAMS} pollInterval={2000} fetchPolicy="network-only">
      {({ loading, error, data }) => {
        if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
        if (error) return <p style={{ textAlign: 'center' }}>Something went wrong </p>;

        if (!data || !data.viewer.memberships.length) {
          return <p style={{ textAlign: 'center' }}>No teams.</p>;
        }
        const { memberships } = data.viewer;

        if (memberships.length === 1) {
          if (!localStorage.getItem(settings.TEAM_ID_TOKEN)) {
            selectTeam(memberships[0].team.id, memberships[0].role);
            props.history.push(PATH_FEED);
          }
        }

        return (
          <Grid columns={2} verticalAlign="middle">
            {memberships.map((membership) => (
              <TeamRow
                data-testid="kudo-teamivite"
                history={props.history}
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

export default withRouter(TeamList);
