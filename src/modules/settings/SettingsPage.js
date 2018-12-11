import { h, Component } from "preact";
import { Button } from "semantic-ui-react";

import { PATH_CHOOSE_TEAM, PATH_INVITE } from "../../routes";
import { Navigation } from "../../components/navigation";
import { auth, isAdmin } from "../../support";

import s from "./style.scss";

export class SettingsPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div>
        <div
          className="page flex"
          style={{ padding: "2em", justifyContent: "space-between" }}
        >
          <div style={{ display: "grid" }}>
            <h2 className={s.name}>Settings</h2>
            {isAdmin() && (
              <a href={PATH_INVITE}>
                <Button color="blue" className={s.button}>
                  Invite
                </Button>
              </a>
            )}
            <a href={PATH_CHOOSE_TEAM}>
              <Button color="orange" className={s.button}>
                Switch team
              </Button>
            </a>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }
}

export default SettingsPage;
