import { h } from "preact";
import { connect } from "preact-redux";
import { Button } from "semantic-ui-react";

import { PATH_CHOOSE_TEAM } from "../../../routes";
import { Navigation } from "../../../components/navigation";

export const SettingsPage = () => (
  <div style={{ height: "100%" }}>
    <div className="page flex" style={{ justifyContent: "space-around" }}>
      <div>
        <h2>Settings</h2>
      </div>
      <a href={PATH_CHOOSE_TEAM}>
        <Button color="orange">Switch team</Button>
      </a>
    </div>
    <Navigation />
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
