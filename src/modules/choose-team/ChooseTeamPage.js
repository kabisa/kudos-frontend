import { h, Component } from "preact";
import { Query } from "react-apollo";

import { Toolbar } from "../../components/navigation";
import { TeamRow } from "./components";
import { isLoggedIn } from "../../support";
import { GET_TEAMS } from "./queries";

import s from "./ChooseTeamPage.scss";

const TeamList = () => (
  <Query query={GET_TEAMS} pollInterval={2000}>
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

export class ChooseTeamPage extends Component {
  constructor(props) {
    super(props);
    isLoggedIn();
  }

  render() {
    return (
      <div>
        <Toolbar text="Choose a group" />
        <div className={s.page}>
          <h2 className={s.header}>Your teams</h2>
          <TeamList />
        </div>
      </div>
    );
  }
}

export default ChooseTeamPage;

// <h2>Your invites</h2>
// <Invite />
// <Invite />
// <Invite />
// <Divider />
