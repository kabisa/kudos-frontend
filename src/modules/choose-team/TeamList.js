import { h } from "preact";
import { Query } from "react-apollo";
import { TeamRow } from "./components";

import { GET_TEAMS } from "./queries";

const TeamList = () => (
  <Query query={GET_TEAMS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return `Error! ${error.message}`;

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
