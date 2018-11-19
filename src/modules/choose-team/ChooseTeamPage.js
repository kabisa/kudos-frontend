import { h, Component } from "preact";

import { Toolbar } from "../../components/navigation";
import { isLoggedIn } from "../../support";
import TeamList from "./TeamList";
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
          <h2 className={s.header}>Your teams</h2>
          <TeamList />
        </div>
      </div>
    );
  }
}

export default ChooseTeamPage;
