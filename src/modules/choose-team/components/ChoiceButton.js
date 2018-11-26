import { h } from "preact";
import { Button } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { route } from "preact-router";

import settings from "src/config/settings";
import { PATH_FEED } from "src/routes";

import s from "./style.scss";

const ChoiceButton = ({ mutation, inviteId, text, color, accept, teamId }) => (
  <Mutation mutation={mutation}>
    {(mutate, { loading }) => {
      if (loading) {
        return (
          <Button color={color} size="small" className={s.button} loading>
            {text}
          </Button>
        );
      }

      return (
        <Button
          color={color}
          size="small"
          className={s.button}
          onClick={() => {
            mutate({ variables: { team_invite_id: inviteId } });
            if (accept) {
              localStorage.setItem(settings.TEAM_ID_TOKEN, teamId);
              route(PATH_FEED, true);
            }
          }}
        >
          {text}
        </Button>
      );
    }}
  </Mutation>
);

export default ChoiceButton;
