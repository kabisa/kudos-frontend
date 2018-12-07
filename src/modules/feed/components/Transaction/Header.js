import { h, Component } from "preact";
import { Dropdown, Image } from "semantic-ui-react";
import moment from "moment-twitter";
import { route } from "preact-router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import settings from "../../../../config/settings";
import { GET_TRANSACTIONS } from "../../queries";
import { PATH_ADD_TRANSACTION } from "src/routes";

import s from "./Header.scss";

export const MUTATION_TOGGLE_LIKE = gql`
  mutation RemovePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export class Header extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
  }

  remove(mutate) {
    if (window.confirm("Are you sure you want to remove this transaction?")) {
      mutate({
        variables: { id: this.props.transaction.id },
      });
    }
  }

  edit() {
    this.props.setEditTransaction(this.props.transaction.id);
    route(PATH_ADD_TRANSACTION);
  }

  render() {
    const { createdAt, amount, votes } = this.props.transaction;
    const timestamp = moment(createdAt);

    return (
      <div className={s.root}>
        <div className={s.kudo_amount}>
          <span data-testid="post-amount">{amount + votes.length} ₭</span>
        </div>
        <div className={s.image_wrapper}>
          {this.props.transaction.receivers.map(user => (
            <Image key={user.id} src={user.avatar} avatar />
          ))}
        </div>
        <span data-testid="post-timestamp" className={s.timestamp}>
          {!timestamp.twitter().includes("/")
            ? `${timestamp.twitter()} ago`
            : timestamp.twitter()}
        </span>
        {localStorage.getItem(settings.USER_ID_TOKEN) ===
          this.props.transaction.sender.id && (
          <Dropdown
            item
            icon="ellipsis vertical"
            direction="left"
            className={s.dropdown}
          >
            <Dropdown.Menu>
              <Mutation
                mutation={MUTATION_TOGGLE_LIKE}
                refetchQueries={[
                  {
                    query: GET_TRANSACTIONS,
                    variables: {
                      team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                    },
                  },
                ]}
              >
                {mutate => (
                  <Dropdown.Item
                    icon="trash"
                    text="Remove"
                    onClick={() => this.remove(mutate)}
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

export default Header;
