import { h } from "preact";
import { Button } from "semantic-ui-react";

import s from "./style.scss";

export const Invite = () => (
  <div className={s.root}>
    <p className={s.text}>Kabisa</p>
    <Button color="green" size="small" className={s.button}>
      Accept
    </Button>
    <Button color="orange" size="small" className={s.button}>
      Decline
    </Button>
  </div>
);

export default Invite;
