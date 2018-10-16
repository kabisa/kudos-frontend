import { h } from "preact";
import { Button } from "semantic-ui-react";

import { PATH_FEED } from "../../../../routes";

export default () => (
  <div style={{ width: "290px", margin: "auto" }}>
    <p style={{ display: "inline", lineHeight: "36px" }}>Kabisa</p>
    <a href={PATH_FEED}>
      <Button color="green" size="small" style={{ float: "right" }}>
        Switch
      </Button>
    </a>
  </div>
);
