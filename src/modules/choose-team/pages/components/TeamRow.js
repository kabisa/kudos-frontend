import { h } from "preact";
import { Button } from "semantic-ui-react";

import { PATH_FEED } from "../../../../routes";

export default () => (
  <div style={{ width: "290px", margin: "auto" }}>
    <h2 style={{ display: "inline" }}>Kabisa</h2>
    <a href={PATH_FEED}>
      <Button color="green" style={{ float: "right" }}>
        Join
      </Button>
    </a>
  </div>
);
