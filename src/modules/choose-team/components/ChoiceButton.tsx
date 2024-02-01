import { Mutation } from "@apollo/client/react/components";
import { DocumentNode } from "graphql";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import settings from "../../../config/settings";
import { PATH_FEED } from "../../../routes";
import { Storage } from "../../../support/storage";
import Button, { type GenericButtonProps } from "../../../ui/Button";
import { GET_INVITES } from "./InviteList";

export interface Props {
  mutation: DocumentNode;
  inviteId: string;
  text: string;
  accept?: boolean;
  teamId: string;
  variant: GenericButtonProps["variant"];
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
          state={loading ? "disabled" : "default"}
        />
      )}
    </Mutation>
  );
}

export default ChoiceButton;
