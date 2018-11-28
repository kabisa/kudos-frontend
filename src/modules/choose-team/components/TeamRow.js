import { h } from "preact";
import { Button } from "semantic-ui-react";
import { route } from "preact-router";

import { PATH_FEED } from "../../../routes";
import settings from "../../../config/settings";

import s from "./style.scss";

export default ({ id, name }) => (
  <div className={s.root}>
    <p className={s.text}>{name}</p>
    <Button
      color="green"
      size="small"
      className={s.button}
      onClick={() => {
        localStorage.setItem(settings.TEAM_ID_TOKEN, id);
        route(PATH_FEED, true);
      }}
    >
      Choose
    </Button>
  </div>
);
