import { Component } from "react";
import { IconButton } from "@sandercamp/ui-components";

import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { History } from "history";
import settings from "../../../../config/settings";
import { FragmentPostResult, GET_POSTS } from "../../queries";
import { PATH_ADD_TRANSACTION } from "../../../../routes";
import { Storage } from "../../../../support/storage";
import { Auth } from "../../../../support";

import s from "./Header.module.scss";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const moment = require("moment-twitter");

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
  showConfirmDialog: boolean;
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

      if (this.props.history) {
        this.props.history.push(PATH_ADD_TRANSACTION);
      }
    }
  }

  closeConfirmDialog() {
    this.setState({
      showConfirmDialog: false,
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.state.showConfirmDialog &&
      this.state.showConfirmDialog !== prevState.showConfirmDialog
    ) {
      const result = window.confirm("Are you sure you want to proceed?");
      if (result) {
        this.remove();
      } else {
        this.closeConfirmDialog();
      }
    }
  }

  render() {
    const { amount, votes } = this.props.transaction;
    // TODO: Find another date library
    // const timestamp = moment(createdAt);

    const allowNormalEdit = true;
    // moment.duration(timestamp.diff(moment())).asMinutes() * -1 <= 15;

    return (
      <div className={s.container}>
        <div className={s.kudos}>
          <span data-testid="post-amount">{amount + votes.length}</span>₭
        </div>
        <div className={s.avatarWrapper}>
          <img
            className={s.avatar}
            data-testid="sender-avatar"
            src={this.props.transaction.sender.avatar}
          />
          {this.props.transaction.receivers.map((user) => (
            <img
              className={s.avatar}
              data-testid="receiver-avatar"
              key={user.id}
              src={user.avatar}
            />
          ))}
        </div>
        <div className={s.utilityContainer}>
          <span data-testid="post-timestamp" className={s.timestamp}>
            {/* {timestamp.fromNow()} */}
          </span>
          {((Storage.getItem(settings.USER_ID_TOKEN) ===
            this.props.transaction.sender.id &&
            allowNormalEdit) ||
            Auth.isTeamAdmin()) && (
            <Mutation<ToggleLikeParameters>
              mutation={MUTATION_REMOVE_POST}
              refetchQueries={[
                {
                  query: GET_POSTS,
                  variables: {
                    team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
                  },
                },
              ]}
              onCompleted={() => toast.info("Post successfully removed!")}
            >
              {(mutate) => (
                <IconButton
                  className={s.deleteButton}
                  name="delete"
                  data-testid="delete-button"
                  onClick={() => this.openConfirmDialog(mutate)}
                />
              )}
            </Mutation>
          )}
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(Header);
