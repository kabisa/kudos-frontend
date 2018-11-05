import { h } from "preact";
import { Button } from "semantic-ui-react";

import { PATH_FEED } from "../../../../routes";

import s from "./style.scss";

export default () => (
  <div className={s.root}>
    <p className={s.text}>Kabisa</p>
    <a href={PATH_FEED}>
      <Button color="green" size="small" className={s.button}>
        Switch
      </Button>
    </a>
  </div>
);
