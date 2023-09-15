import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { DocumentNode } from "graphql";
import settings from "../../../config/settings";
import { PATH_FEED } from "../../../routes";
import { GET_INVITES } from "./InviteList";
import { Storage } from "../../../support/storage";
import s from "./ChooseTeam.module.scss";
import { Button } from "@sandercamp/ui-components";
import { ButtonProps } from "@sandercamp/ui-components/lib/atoms/Button";

export interface Props {
  mutation: DocumentNode;
  inviteId: string;
  text: string;
  accept?: boolean;
  teamId: string;
  variant: ButtonProps["variant"];
}

function ChoiceButton(props: Props) {
  const history = useHistory();

  return (
    <Mutation<any>
      mutation={props.mutation}
      update={(cache, { data: { declineInvite } }) => {
        if (props.accept) {
          return;
        }

        let oldState: any;
        try {
          oldState = cache.readQuery({ query: GET_INVITES });
        } catch (err) {
          // This is just to silence the error in the tests
          return;
        }
        if (!oldState || !oldState.viewer) return;
        const newState = {
          ...oldState,
          viewer: {
            ...oldState.viewer,
            self: {
              ...oldState.viewer.self,
              teamInvites: oldState.viewer.self.teamInvites.filter(
                (item: any) => item.id !== declineInvite.id,
              ),
            },
          },
        };
        cache.writeQuery({
          query: GET_INVITES,
          data: newState,
        });
      }}
    >
      {(mutate, { loading }) => (
        <Button
          variant={props.variant}
          className={s.button}
          onClick={() => {
            mutate({ variables: { team_invite_id: props.inviteId } });
            if (props.accept) {
              Storage.setItem(settings.TEAM_ID_TOKEN, props.teamId);
              toast.info("Invite successfully accepted!");
              history.push(PATH_FEED);
              return;
            }
            toast.info("Invite successfully declined!");
          }}
          disabled={loading}
        >
          {props.text}
        </Button>
      )}
    </Mutation>
  );
}

export default ChoiceButton;
