import { h, Component } from "preact";
import { Divider } from "semantic-ui-react";
import { Query } from "react-apollo";

import { Toolbar } from "../../components/navigation";
import { Invite, TeamRow } from "./components";
// import { isLoggedIn } from "../../support";
import { GET_TEAMS } from "./queries";

import s from "./ChooseTeamPage.scss";

export class ChooseTeamPage extends Component {
  constructor(props) {
    super(props);
    // isLoggedIn();
  }

  render() {
    return (
      <div>
        <Toolbar text="Choose a group" />
        <div className={s.page}>
          <h2>Your invites</h2>
          <Invite />
          <Invite />
          <Invite />
          <Divider />
          <h2>Your teams</h2>
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
        </div>
      </div>
    );
  }
}

export default ChooseTeamPage;
