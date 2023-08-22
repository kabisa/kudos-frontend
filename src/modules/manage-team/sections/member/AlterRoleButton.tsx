import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { ALTER_ROLE, AlterRoleParameters, Membership } from "./Members";
import settings from "../../../../config/settings";
import { Storage } from "../../../../support/storage";

export interface AlterRoleButtonProps {
  refetch: () => void;
  membership: Membership;
  mode: AlterRoleButtonMode;
}

export enum AlterRoleButtonMode {
  PROMOTE,
  DEMOTE,
}

export function AlterRoleButton(
  props: AlterRoleButtonProps
): React.ReactElement {
  function isDisabled(): boolean {
    if (props.mode === AlterRoleButtonMode.PROMOTE) {
      return props.membership.role === "admin";
    }

    return props.membership.role === "member";
  }

  function variables() {
    if (props.mode === AlterRoleButtonMode.PROMOTE) {
      return {
        role: props.membership.role === "member" ? "moderator" : "admin",
        userId: props.membership.user.id,
        teamId: Storage.getItem(settings.TEAM_ID_TOKEN),
      };
    }

    return {
      role: props.membership.role === "moderator" ? "member" : "moderator",
      userId: props.membership.user.id,
      teamId: Storage.getItem(settings.TEAM_ID_TOKEN),
    };
  }

  return (
    <Mutation<AlterRoleParameters>
      mutation={ALTER_ROLE}
      onCompleted={() => {
        toast.info("Role updated successfully!");
        props.refetch();
      }}
    >
      {(mutate, { loading }) => (
        <Button
          color={props.mode === AlterRoleButtonMode.PROMOTE ? "teal" : "yellow"}
          size="tiny"
          icon={
            props.mode === AlterRoleButtonMode.PROMOTE
              ? "arrow up"
              : "arrow down"
          }
          loading={loading}
          disabled={isDisabled()}
          onClick={() =>
            mutate({
              variables: variables(),
            })
          }
        />
      )}
    </Mutation>
  );
}
