import { h, Component } from "preact";
import { Button } from "semantic-ui-react";

import { PATH_CHOOSE_TEAM } from "../../routes";
import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

import s from "./SettingsPage.scss";

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
          <div>
            <h2>Settings</h2>
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
