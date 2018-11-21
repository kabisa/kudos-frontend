import { h, Component } from "preact";
import { Divider } from "semantic-ui-react";

import { Toolbar } from "../../components/navigation";
import { TeamList, InviteList } from "./components";
import { isLoggedIn } from "../../support";

import s from "./ChooseTeamPage.scss";

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
          <h2 className={s.header}>Your invites</h2>
          <InviteList />
          <Divider />
          <h2 className={s.header}>Your teams</h2>
          <TeamList />
        </div>
      </div>
    );
  }
}

export default ChooseTeamPage;
