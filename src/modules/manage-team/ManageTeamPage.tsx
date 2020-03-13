import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';

import { Route, Switch, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Navigation } from '../../components/navigation';

import s from '../feed/AddTransactionPage.module.scss';
import {
  GeneralSection, InviteSection, MemberSection, KudometerSection, GuidelineSection,
} from './sections';

import { PATH_MANAGE_TEAM } from '../../routes';

export interface Props {
  history: History;
}

export interface State {
  activeItem: string;
}

export class ManageTeamPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { activeItem: 'general' };

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
                  <Menu.Item
                    name="general"
                    active={activeItem === 'general'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="invites"
                    active={activeItem === 'invites'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="guidelines"
                    active={activeItem === 'guidelines'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="members"
                    active={activeItem === 'members'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="kudometer"
                    active={activeItem === 'kudometer'}
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
