import React from "react";
import { Button, Divider, Segment } from "semantic-ui-react";
import { useHistory, withRouter } from "react-router-dom";
import { History } from "history";

import { PATH_CREATE_TEAM } from "../../routes";
import { Navigation } from "../../components/navigation";
import { InviteList, TeamList } from "./components";

import s from "./ChooseTeamPage.module.scss";
import { Media } from "../../support/breakpoints";

export function Content(): React.ReactElement {
  const history = useHistory();

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
          history.push(PATH_CREATE_TEAM);
        }}
      >
        Create team
      </Button>
    </div>
  );
}

function ChooseTeamPage(): React.ReactElement {
  const history = useHistory();

  return (
    <div>
      <div className="page">
        <Media greaterThanOrEqual="tablet">
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
        </Media>
        <Media lessThan="tablet">
          <Content />
        </Media>
      </div>
      <Navigation />
    </div>
  );
}

export default ChooseTeamPage;
