import React from 'react';
import { Button, Confirm, Table } from 'semantic-ui-react';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import settings from '../../../../config/settings';
import {
  DeleteInviteParameters, InviteModel, MUTATION_DELETE_INVITE, QUERY_GET_INVITES,
} from './InvitesSection';

export interface InviteProps {
  invite: InviteModel;
  key: number;
}

export interface InviteState {
  showDialog: boolean;
}

export class Invite extends React.Component<InviteProps, InviteState> {
  deleteMutation: any;

  constructor(props: InviteProps) {
    super(props);

    this.state = {
      showDialog: false,
    };

    this.showConfirmDialog = this.showConfirmDialog.bind(this);
    this.closeConfirmDialog = this.closeConfirmDialog.bind(this);
    this.deleteInvite = this.deleteInvite.bind(this);
  }

  showConfirmDialog(deleteMutation: any) {
    this.deleteMutation = deleteMutation;
    this.setState({
      showDialog: true,
    });
  }

  closeConfirmDialog() {
    this.setState({
      showDialog: false,
    });
  }

  deleteInvite() {
    this.closeConfirmDialog();
    this.deleteMutation({
      variables: { id: this.props.invite.id },
    });
  }


  render() {
    let rowClassName = '';
    if (this.props.invite.declinedAt) {
      rowClassName = 'negative';
    } else if (this.props.invite.acceptedAt) {
      rowClassName = 'positive';
    }


    return (
      <Table.Row key={this.props.invite.id} className={rowClassName}>
        <Table.Cell>{moment(this.props.invite.sentAt).format('YYYY-MM-DD')}</Table.Cell>
        <Table.Cell>{this.props.invite.email}</Table.Cell>
        <Table.Cell>
          {this.props.invite.acceptedAt && 'Accepted'}
          {this.props.invite.declinedAt && 'Declined'}
          {!this.props.invite.declinedAt && !this.props.invite.acceptedAt && 'Pending'}
        </Table.Cell>
        <Table.Cell>
          <Mutation<DeleteInviteParameters>
            mutation={MUTATION_DELETE_INVITE}
            onCompleted={() => {
              toast.info('Invite removed successfully!');
            }}
            refetchQueries={[
              {
                query: QUERY_GET_INVITES,
                variables: {
                  team_id: localStorage.getItem(
                    settings.TEAM_ID_TOKEN,
                  ),
                },
              },
            ]}
          >
            {(deleteInvite, { loading }) => (
              <Button
                color="red"
                icon="trash"
                size="tiny"
                loading={loading}
                onClick={() => { this.showConfirmDialog(deleteInvite); }}
              />
            )}
          </Mutation>
        </Table.Cell>
        <Confirm
          size="tiny"
          open={this.state.showDialog}
          onConfirm={this.deleteInvite}
          onCancel={this.closeConfirmDialog}
        />
      </Table.Row>

    );
  }
}
