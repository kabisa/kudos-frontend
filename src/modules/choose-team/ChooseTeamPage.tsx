import React from "react";
import { useHistory } from "react-router-dom";

import { PATH_CREATE_TEAM } from "../../routes";
import { Navigation } from "../../components/navigation";
import { InviteList, TeamList } from "./components";

import s from "./ChooseTeamPage.module.scss";
import { TabletAndAbove, TabletAndBelow } from "../../support/breakpoints";
import { Button } from "@sandercamp/ui-components";

export function Content(): React.ReactElement {
  const history = useHistory();

  return (
    <div className={s.container}>
      <h2 className={s.header}>Your invites</h2>
      <InviteList />
      <h2 className={s.header}>Your teams</h2>
      <TeamList />
      <span>Or</span>
      <Button
        variant="primary"
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
  return (
    <div>
      <div className="page">
        <TabletAndAbove>
          <div
            className="ui segment"
            style={{
              width: "40em",
              margin: "auto",
              padding: "4em",
              marginTop: "2em",
            }}
          >
            <Content />
          </div>
        </TabletAndAbove>
        <TabletAndBelow>
          <Content />
        </TabletAndBelow>
      </div>
      <Navigation />
    </div>
  );
}

export default ChooseTeamPage;
