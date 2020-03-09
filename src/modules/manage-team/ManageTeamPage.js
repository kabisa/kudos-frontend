import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

import s from "../feed/AddTransactionPage.module.scss";
import {
  GeneralSection,
  InviteSection,
  GuidelineSection,
  MemberSection,
  KudometerSection,
} from "./sections";
import {Switch, Route, withRouter} from "react-router-dom";
import { PATH_MANAGE_TEAM } from "../../routes";

export class ManageTeamPage extends Component {
  constructor(props) {
    super(props);

    auth(true);

    this.state = { activeItem: "general" };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.history.push(name)
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <div className={s.page}>
          <Segment
            id="management-container"
            style={{
              width: "60em",
              margin: "auto",
              padding: "2em",
              marginTop: "4em",
            }}
          >
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name="general"
                    active={activeItem === "general"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="invites"
                    active={activeItem === "invites"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="guidelines"
                    active={activeItem === "guidelines"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="members"
                    active={activeItem === "members"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="kudometer"
                    active={activeItem === "kudometer"}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12}>
                <Switch>
                  <Route path={`${PATH_MANAGE_TEAM}/general`}>
                    <GeneralSection />
                  </Route>
                  <Route path={`${PATH_MANAGE_TEAM}/invites`}>
                    <InviteSection />
                  </Route>
                  <Route path={`${PATH_MANAGE_TEAM}/guidelines`}>
                    <GuidelineSection />
                  </Route>
                  <Route path={`${PATH_MANAGE_TEAM}/members`}>
                    <MemberSection />
                  </Route>
                  <Route path={`${PATH_MANAGE_TEAM}/kudometer`}>
                    <KudometerSection />
                  </Route>
                </Switch>
                {/*/!*{activeItem === "general" && <GeneralSection />}*!/*/}
                {/*{activeItem === "invites" && <InviteSection />}*/}
                {/*{activeItem === "guidelines" && <GuidelineSection />}*/}
                {/*{activeItem === "members" && <MemberSection />}*/}
                {/*{activeItem === "kudometer" && <KudometerSection />}*/}
                {/*{activeItem === "integrations" && <IntegrationSection />}*/}
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default withRouter(ManageTeamPage);
