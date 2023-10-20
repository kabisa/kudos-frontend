import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import settings from "../../../../config/settings";
import {
  DEACTIVATE_USER,
  DeactivateUserParameters,
  Membership,
} from "./Members";
import { AlterRoleButton, AlterRoleButtonMode } from "./AlterRoleButton";
import { Storage } from "../../../../support/storage";
import { IconButton } from "@sandercamp/ui-components";
import {
  DefaultContext,
  MutationFunction,
  OperationVariables,
} from "@apollo/client";

export interface MemberRowProps {
  key: string;
  membership: Membership;
  refetch: () => void;
}

export function MemberRow(props: MemberRowProps) {
  const showConfirmDialog = (
    deleteMember: MutationFunction<
      DeactivateUserParameters,
      OperationVariables,
      DefaultContext
    >,
  ) => {
    const result = window.confirm(
      "Are you sure you want to delete this member?",
    );
    if (result) {
      deleteMember({
        variables: { id: props.membership.id },
      });
    }
  };

  const userId = Storage.getItem(settings.USER_ID_TOKEN) || "";

  return (
    <tr key={props.membership.id}>
      <td>{props.membership.user.name}</td>
      <td>{props.membership.user.email}</td>
      <td>{props.membership.role}</td>
      <td>
        {userId !== props.membership.user.id && (
          <>
            <AlterRoleButton
              refetch={props.refetch}
              membership={props.membership}
              mode={AlterRoleButtonMode.PROMOTE}
            />
            <AlterRoleButton
              refetch={props.refetch}
              membership={props.membership}
              mode={AlterRoleButtonMode.DEMOTE}
            />
            <Mutation<DeactivateUserParameters>
              mutation={DEACTIVATE_USER}
              onError={(e) => {
                console.log(e);
                toast.error("Error deactivating user");
              }}
              onCompleted={() => {
                props.refetch();
                toast.info("User deactivated successfully!");
              }}
            >
              {(deleteMember, { loading }) => (
                <IconButton
                  data-testid="deactivate-button"
                  name="delete"
                  disabled={loading}
                  variant="tertiary"
                  onClick={() => showConfirmDialog(deleteMember)}
                />
              )}
            </Mutation>
          </>
        )}
      </td>
    </tr>
  );
}
