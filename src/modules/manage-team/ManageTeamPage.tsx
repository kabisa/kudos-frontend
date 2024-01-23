import { Component, MouseEvent } from "react";

import { Route, Switch, withRouter } from "react-router-dom";
import { History } from "history";

import s from "./ManageTeamPage.module.css";
import {
  GeneralSection,
  InviteSection,
  MemberSection,
  KudometerSection,
  GuidelineSection,
} from "./sections";

import { PATH_MANAGE_TEAM } from "../../routes";
import IntegrationSections from "./sections/integrations/Integrations";
import classNames from "classnames";
import Segment from "../../components/atoms/Segment";
import Page from "../../components/templates/Page";
import { Icon } from "@kabisa/ui-components";
import { Card } from "../../ui/Card";

export interface Props {
  history: History;
}

export interface State {
  activeItem: string;
}

export class ManageTeamPage extends Component<Props, State> {
  sections: { icon: string; name: string }[] = [
    { icon: "settings", name: "general" },
    { icon: "steps", name: "guidelines" },
    { icon: "mail", name: "invites" },
    { icon: "people", name: "members" },
    { icon: "flag", name: "kudometers" },
    { icon: "move_up", name: "integrations" },
  ];

  constructor(props: Props) {
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

// @ts-ignore
export default withRouter(ManageTeamPage);
