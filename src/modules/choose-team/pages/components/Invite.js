import { h } from "preact";
import { Button } from "semantic-ui-react";

export const Invite = () => (
  <div style={{ width: "290px", margin: "auto", paddingBottom: "1em" }}>
    <p style={{ display: "inline", lineHeight: "28px" }}>Kabisa</p>
    <Button color="green" size="small" style={{ float: "right" }}>
      Accept
    </Button>
    <Button color="orange" size="small" style={{ float: "right" }}>
      Decline
    </Button>
  </div>
);

export default Invite;
