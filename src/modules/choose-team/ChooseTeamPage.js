import React, { Component } from "react";
import { Divider, Segment, Responsive, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import { PATH_CREATE_TEAM } from "../../routes";
import { Navigation } from "../../components/navigation";
import { TeamList, InviteList } from "./components";
import { authAllowNoTeam } from "../../support";

import s from "./ChooseTeamPage.scss";

const Content = () => (
  <div className={s.container}>
    <h2 className={s.header}>Your invites</h2>
    <InviteList />
    <Divider />
    <h2 className={s.header}>Your teams</h2>
    <TeamList />
    <Divider horizontal>Or</Divider>
    <Button
      color="blue"
      style={{ margin: "auto" }}
      onClick={() => { return <Redirect to={PATH_CREATE_TEAM} />}}
    >
      Create team
    </Button>
  </div>
);

export class ChooseTeamPage extends Component {
  constructor(props) {
    super(props);
    authAllowNoTeam();
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
