import { h } from "preact";
import { Button } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { route } from "preact-router";
import { toast } from "react-toastify";

import settings from "src/config/settings";
import { PATH_FEED } from "src/routes";
import { GET_INVITES } from "./InviteList";

import s from "./style.scss";

const ChoiceButton = ({ mutation, inviteId, text, color, accept, teamId }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { declineInvite } }) => {
      if (accept) {
        return;
      }
      const oldState = cache.readQuery({ query: GET_INVITES });
      const newState = {
        ...oldState,
        viewer: {
          ...oldState.viewer,
          self: {
            ...oldState.viewer.self,
            teamInvites: oldState.viewer.self.teamInvites.filter(
              item => item.id !== declineInvite.id
            ),
          },
        },
      };
      cache.writeQuery({
        query: GET_INVITES,
        data: newState,
      });
    }}
    onCompleted={() => {
      if (accept) {
        toast.success("Invite succesfully accepted!");
      } else {
        toast.success("Invite succesfully declined!");
      }
    }}
  >
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
