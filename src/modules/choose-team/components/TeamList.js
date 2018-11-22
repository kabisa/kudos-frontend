import { h } from "preact";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import TeamRow from "./TeamRow";

export const GET_TEAMS = gql`
  query getTeams {
    viewer {
      self {
        teams {
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
      if (error)
        return <p style={{ textAlign: "center" }}>Error! {error.message}</p>;
      const teams = data.viewer.self.teams;
      if (!teams.length) {
        return <p style={{ textAlign: "center" }}>No teams.</p>;
      }

      return (
        <div>
          {teams.map(team => (
            <TeamRow id={team.id} name={team.name} key={team.id} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default TeamList;
