import { h } from "preact";
import { Button } from "semantic-ui-react";
import { Mutation } from "react-apollo";

import s from "./style.scss";

const ChoiceButton = ({ mutation, inviteId, text, color }) => (
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
          onClick={() => mutate({ variables: { team_invite_id: inviteId } })}
        >
          {text}
        </Button>
      );
    }}
  </Mutation>
);

export default ChoiceButton;
