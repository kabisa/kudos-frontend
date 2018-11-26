import { h, Component } from "preact";
import { Divider, Segment, Responsive } from "semantic-ui-react";

import { Navigation } from "../../components/navigation";
import { TeamList, InviteList } from "./components";
import { isLoggedIn } from "../../support";

import s from "./ChooseTeamPage.scss";

const Content = () => (
  <div>
    <h2 className={s.header}>Your invites</h2>
    <InviteList />
    <Divider />
    <h2 className={s.header}>Your teams</h2>
    <TeamList />
  </div>
);

export class ChooseTeamPage extends Component {
  constructor(props) {
    super(props);
    isLoggedIn();
  }

  render() {
    return (
      <div>
        <div className={s.page}>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Segment
              style={{
                width: "40em",
                margin: "auto",
                padding: "4em",
                marginTop: "2em",
              }}
            >
              <Content />
            </Segment>
          </Responsive>
          <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <Content />
          </Responsive>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default ChooseTeamPage;
