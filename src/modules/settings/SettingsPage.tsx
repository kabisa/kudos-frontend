import React from "react";
import { Button } from "@sandercamp/ui-components";

import { Link } from "react-router-dom";
import { PATH_CHOOSE_TEAM, PATH_INVITE } from "../../routes";
import { isAdmin } from "../../support";

import s from "./Settings.module.scss";
import Page from "../../components/templates/Page";

export interface Props {
  // Future props go here
}

export interface State {
  // Future state vars go here
}

export function SettingsPage(): React.ReactElement {
  return (
    <Page>
      <div className={s.container}>
        <h2 className={s.name}>Settings</h2>
        {isAdmin() && (
          <Link to={PATH_INVITE}>
            <Button variant="primary" className={s.button}>
              Invite
            </Button>
          </Link>
        )}
        <Link to={PATH_CHOOSE_TEAM}>
          <Button variant="primary" className={s.button}>
            Switch team
          </Button>
        </Link>
      </div>
    </Page>
  );
}

export default SettingsPage;
