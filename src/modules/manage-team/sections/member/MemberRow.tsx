import { Button, Table } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import React from 'react';
import settings from '../../../../config/settings';
import { DEACTIVATE_USER, DeactivateUserParameters, Membership } from './Members';
import { AlterRoleButton, AlterRoleButtonMode } from './AlterRoleButton';

export interface MemberRowProps {
  key: string
  membership: Membership;
  refetch: () => void;
}

export function MemberRow(props: MemberRowProps) {
  const userId = localStorage.getItem(settings.USER_ID_TOKEN) || '';

  return (
    <Table.Row key={props.membership.id}>
      <Table.Cell>{props.membership.user.name}</Table.Cell>
      <Table.Cell>{props.membership.user.email}</Table.Cell>
      <Table.Cell>{props.membership.role}</Table.Cell>
      <Table.Cell>
        {userId !== props.membership.user.id && (
        <div>
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
            onCompleted={() => {
              toast.info('User deactivated successfully!');
            }}
          >
            {(mutate, { loading }) => (
              <Button
                data-testid="deactivate-button"
                color="red"
                size="tiny"
                icon="trash"
                loading={loading}
                onClick={() => {
                  mutate({
                    variables: { id: props.membership.id },
                  });
                  props.refetch();
                }}
              />
            )}
          </Mutation>
        </div>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
