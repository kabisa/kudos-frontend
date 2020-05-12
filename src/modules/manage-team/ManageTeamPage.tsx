import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';

import { Route, Switch, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Navigation } from '../../components/navigation';

import s from '../feed/FeedPage.module.scss';
import {
  GeneralSection, InviteSection, MemberSection, KudometerSection, GuidelineSection,
} from './sections';

import { PATH_MANAGE_TEAM } from '../../routes';
import IntegrationSections from './sections/Integrations';

export interface Props {
  history: History;
}

export interface State {
  activeItem: string;
}

export class ManageTeamPage extends Component<Props, State> {
  sections: string[] = ['general', 'guidelines', 'invites', 'members', 'kudometers', 'integrations'];

  constructor(props: Props) {
    super(props);

    const location = props.history.location.pathname;
    const path = location.substr(location.lastIndexOf('/') + 1, location.length);

    if (this.sections.indexOf(path) !== -1) {
      this.state = { activeItem: path };
    } else {
      this.state = { activeItem: 'general' };
    }


    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e: React.MouseEvent<HTMLAnchorElement>, { name }: any) {
    this.setState({ activeItem: name });
    this.props.history.push(name);
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <div className={s.page}>
          <Segment
            id="management-container"
            style={{
              width: '60em',
              margin: 'auto',
              padding: '2em',
              marginTop: '4em',
            }}
          >
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  {this.sections.map((section) => (
                    <Menu.Item
                      key={section}
                      data-testid={`${section}-button`}
                      name={section}
                      active={activeItem === section}
                      onClick={this.handleItemClick}
                    />
                  ))}
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
                  <Route path={`${PATH_MANAGE_TEAM}/kudometers`}>
                    <KudometerSection />
                  </Route>
                  <Route path={`${PATH_MANAGE_TEAM}/integrations`}>
                    <IntegrationSections history={this.props.history} />
                  </Route>
                </Switch>
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
        <Navigation />
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(ManageTeamPage);
