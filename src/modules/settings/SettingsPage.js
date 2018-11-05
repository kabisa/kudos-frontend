import { h, Component } from "preact";
import { Button } from "semantic-ui-react";

import { PATH_CHOOSE_TEAM } from "../../routes";
import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

export class SettingsPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div
          className="page flex"
          style={{ justifyContent: "space-between", padding: "2em" }}
        >
          <div>
            <h2>Settings</h2>
          </div>
          <a href={PATH_CHOOSE_TEAM}>
            <Button color="orange" style={{ width: "100%" }}>
              Switch team
            </Button>
          </a>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default SettingsPage;
