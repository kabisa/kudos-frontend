import React from 'react';
import {
  Button, Divider, Responsive, Segment,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { PATH_CREATE_TEAM } from '../../routes';
import { Navigation } from '../../components/navigation';
import { InviteList, TeamList } from './components';

import s from './ChooseTeamPage.module.scss';

export interface ContentProps {
  history: History;
}

export function Content(props: ContentProps): React.ReactElement {
  return (
    <div className={s.container}>
      <h2 className={s.header}>Your invites</h2>
      <InviteList data-testid="invite-list" />
      <Divider />
      <h2 className={s.header}>Your teams</h2>
      <TeamList data-testid="personal-team-list" />
      <Divider horizontal>Or</Divider>
      <Button
        data-testid="create-team"
        color="blue"
        className={s.create_button}
        onClick={() => {
          props.history.push(PATH_CREATE_TEAM);
        }}
      >
        Create team
      </Button>
    </div>
  );
}

export interface Props {
  history: History;
}

function ChooseTeamPage(props: Props): React.ReactElement {
  return (
    <div>
      <div className="page">
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Segment
            style={{
              width: '40em',
              margin: 'auto',
              padding: '4em',
              marginTop: '2em',
            }}
          >
            <Content history={props.history} />
          </Segment>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <Content history={props.history} />
        </Responsive>
      </div>
      <Navigation />
    </div>
  );
}

// @ts-ignore
export default withRouter(ChooseTeamPage);
