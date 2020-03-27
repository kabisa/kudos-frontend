import React, { Component } from 'react';
import { Confirm, Dropdown, Image } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import settings from '../../../../config/settings';
import { FragmentPostResult, GET_POSTS } from '../../queries';
import { PATH_ADD_TRANSACTION } from '../../../../routes';

import s from './Header.module.scss';

const moment = require('moment-twitter');

export const MUTATION_REMOVE_POST = gql`
    mutation RemovePost($id: ID!) {
        deletePost(id: $id) {
            postId
        }
    }
`;

export interface ToggleLikeParameters {
  id: string;
}

export interface Props {
  transaction: FragmentPostResult;
  history?: History;
  setEditTransaction?: (id: string) => void;
}

export interface State {
  // Future state vars go here
  showConfirmDialog: boolean
}

export class Header extends Component<Props, State> {
  mutate: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      showConfirmDialog: false,
    };

    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
  }

  openConfirmDialog(mutate: any) {
    this.mutate = mutate;
    this.setState({
      showConfirmDialog: true,
    });
  }

  remove() {
    this.mutate({
      variables: { id: this.props.transaction.id },
    });
    this.closeConfirmDialog();
  }

  edit() {
    if (this.props.setEditTransaction) {
      this.props.setEditTransaction(this.props.transaction.id);
            this.props.history?.push(PATH_ADD_TRANSACTION);
    }
  }

  closeConfirmDialog() {
    this.setState({
      showConfirmDialog: false,
    });
  }

  render() {
    const { createdAt, amount, votes } = this.props.transaction;
    const timestamp = moment(createdAt);

    const allowNormalEdit = moment.duration(timestamp.diff(moment())).asMinutes() * -1 <= 15;

    return (
      <div className={s.root}>
        <Confirm
          data-testid="confirm-dialog"
          size="mini"
          open={this.state.showConfirmDialog}
          onCancel={() => this.closeConfirmDialog()}
          onConfirm={this.remove}
        />
        <div className={s.kudo_amount}>
          <span data-testid="post-amount">{amount + votes.length}₭</span>
        </div>
        <div className={s.image_wrapper}>
          <Image data-testid="sender-avatar" src={this.props.transaction.sender.avatar} avatar />
          {this.props.transaction.receivers.map((user) => (
            <Image data-testid="receiver-avatar" key={user.id} src={user.avatar} avatar />
          ))}
        </div>
        <span data-testid="post-timestamp" className={s.timestamp}>
          {timestamp.fromNow()}
        </span>
        {((localStorage.getItem(settings.USER_ID_TOKEN) === this.props.transaction.sender.id
            && allowNormalEdit)
            || localStorage.getItem(settings.ROLE_TOKEN) === 'admin') && (
            <Dropdown data-testid="post-dropdown" item icon="ellipsis vertical" direction="left" className={s.dropdown}>
              <Dropdown.Menu>
                <Mutation<ToggleLikeParameters>
                  mutation={MUTATION_REMOVE_POST}
                  refetchQueries={[
                    {
                      query: GET_POSTS,
                      variables: {
                        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                      },
                    },
                  ]}
                  onCompleted={() => toast.info('Post successfully removed!')}
                >
                  {(mutate) => (
                    <Dropdown.Item
                      data-testid="delete-button"
                      icon="trash"
                      text="Remove"
                      onClick={() => this.openConfirmDialog(mutate)}
                    />
                  )}
                </Mutation>
              </Dropdown.Menu>
            </Dropdown>
        )}
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(Header);
