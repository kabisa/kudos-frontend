import React, { Component } from "react";

import { Route, Switch, withRouter } from "react-router-dom";
import { History } from "history";
import { Navigation } from "../../components/navigation";

import s from "./ManageTeamPage.module.scss";
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

export interface Props {
  history: History;
}

export interface State {
  activeItem: string;
}

export class ManageTeamPage extends Component<Props, State> {
  sections: string[] = [
    "general",
    "guidelines",
    "invites",
    "members",
    "kudometers",
    "integrations",
  ];

  constructor(props: Props) {
    super(props);

    const location = props.history.location.pathname;
    const path = location.substring(location.lastIndexOf("/") + 1);

    if (this.sections.indexOf(path) !== -1) {
      this.state = { activeItem: path };
    } else {
      this.state = { activeItem: "general" };
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    name: string,
  ) {
    this.setState({ activeItem: name });
    this.props.history.push(name);
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <div className="page">
          <div id="management-container" className={s.container}>
            <div className="grid">
              <div className="grid_column">
                <Segment className={s.menu_segment}>
                  {this.sections.map((section) => (
                    <a
                      key={section}
                      data-testid={`${section}-button`}
                      className={classNames({
                        [s.active_item]: activeItem === section,
                      })}
                      onClick={(e) => this.handleItemClick(e, section)}
                    >
                      {section}
                    </a>
                  ))}
                </Segment>
              </div>

              <div className="grid_column">
                <Segment>
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
                </Segment>
              </div>
            </div>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(ManageTeamPage);
