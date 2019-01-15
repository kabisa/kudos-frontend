import { h, Component } from "preact";
import { Grid, Menu, Segment } from "semantic-ui-react";

import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

import s from "../feed/AddTransactionPage.scss";
import {
  GeneralSection,
  InviteSection,
  GuidelineSection,
  MemberSection,
  KudometerSection,
  IntegrationSection,
} from "./sections";

export class ManageTeamPage extends Component {
  constructor(props) {
    super(props);

    auth(true);

    this.state = { activeItem: "kudometer" };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <div className={s.page}>
          <Segment
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
                  <Menu.Item
                    name="integrations"
                    active={activeItem === "integrations"}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12}>
                {activeItem === "general" && <GeneralSection />}
                {activeItem === "invites" && <InviteSection />}
                {activeItem === "guidelines" && <GuidelineSection />}
                {activeItem === "members" && <MemberSection />}
                {activeItem === "kudometer" && <KudometerSection />}
                {activeItem === "integrations" && <IntegrationSection />}
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
        <Navigation />
      </div>
    );
  }
}
export default ManageTeamPage;
