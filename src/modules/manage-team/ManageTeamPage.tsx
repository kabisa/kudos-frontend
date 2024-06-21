import { Component, MouseEvent } from "react";

import { Route, RouteComponentProps, Switch } from "react-router-dom";

import s from "./ManageTeamPage.module.scss";
import {
  GeneralSection,
  GuidelineSection,
  InviteSection,
  KudometerSection,
  MemberSection,
} from "./sections";

import { Icon } from "@kabisa/ui-components";
import classNames from "classnames";
import Page from "../../components/templates/Page";
import { PATH_MANAGE_TEAM } from "../../routes";
import { Card } from "../../ui/Card";
import IntegrationSections from "./sections/integrations/Integrations";

export interface State {
  activeItem: string;
}

export class ManageTeamPage extends Component<RouteComponentProps, State> {
  sections: { icon: string; name: string }[] = [
    { icon: "settings", name: "general" },
    { icon: "steps", name: "guidelines" },
    { icon: "mail", name: "invites" },
    { icon: "people", name: "members" },
    { icon: "flag", name: "kudometers" },
    { icon: "move_up", name: "integrations" },
  ];

  constructor(props: RouteComponentProps) {
    super(props);

    const location = props.history.location.pathname;
    const path = location.substring(location.lastIndexOf("/") + 1);

    // Check if 'path' matches any 'section' property in the 'sections' array
    const sectionIndex = this.sections.findIndex((item) => item.name === path);

    if (sectionIndex !== -1) {
      this.state = { activeItem: path };
    } else {
      this.state = { activeItem: "general" };
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(_e: MouseEvent<HTMLAnchorElement>, name: string) {
    this.setState({ activeItem: name });
    this.props.history.push(name);
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Page>
        <div className={s.container}>
          <Card
            className={s.navigation_card}
            center={true}
            content={
              <div className={s.menu_card_content}>
                {this.sections.map((section) => (
                  <a
                    key={section.name}
                    data-testid={`${section.name}-button`}
                    className={classNames({
                      [s.active_item]: activeItem === section.name,
                    })}
                    onClick={(e) => this.handleItemClick(e, section.name)}
                  >
                    <Icon name={section.icon} /> {section.name}
                  </a>
                ))}
              </div>
            }
          />
          <Card
            className={s.content_card}
            content={
              <div className={s.content_card_content}>
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
                  <Route path={`${PATH_MANAGE_TEAM}/kudometers`}>
                    <KudometerSection />
                  </Route>
                  <Route path={`${PATH_MANAGE_TEAM}/integrations`}>
                    <IntegrationSections history={this.props.history} />
                  </Route>
                </Switch>
              </div>
            }
          />
        </div>
      </Page>
    );
  }
}

export default ManageTeamPage;
