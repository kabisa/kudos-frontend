import { h } from "preact";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import TeamRow from "./TeamRow";

export const GET_TEAMS = gql`
  query getTeams {
    teams {
      id
      name
    }
  }
`;

const TeamList = () => (
  <Query query={GET_TEAMS} pollInterval={2000}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return `Error! ${error.message}`;

      if (!data.teams.length) {
        return <p>No teams.</p>;
      }

      return (
        <div>
          {data.teams.map(team => (
            <TeamRow id={team.id} name={team.name} key={team.id} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default TeamList;
