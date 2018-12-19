import { h } from "preact";
import { Button } from "semantic-ui-react";

import s from "./style.scss";
import { selectTeam } from "../utils";

export default ({ id, name, role }) => (
  <div className={s.root}>
    <p className={s.text}>{name}</p>
    <Button
      color="green"
      size="small"
      className={s.button}
      onClick={() => selectTeam(id, role)}
    >
      Choose
    </Button>
  </div>
);
