import { h, Component } from "preact";
import { Dropdown } from "semantic-ui-react";
import moment from "moment-twitter";
import { route } from "preact-router";

import { PATH_ADD_TRANSACTION } from "../../../../../routes";

import s from "./Header.scss";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
  }

  remove() {
    if (window.confirm("Are you sure you want to remove this transaction?")) {
      this.props.removeTransaction(this.props.transaction.id);
    }
  }

  edit() {
    this.props.setEditTransaction(this.props.transaction.id);
    route(PATH_ADD_TRANSACTION);
  }

  render() {
    const { createdOn, amount } = this.props.transaction;
    const timestamp = moment(createdOn);

    return (
      <div className={s.root}>
        <div className={s.kudo_amount}>
          <span>{amount} ₭</span>
        </div>
        <div className={s.image_wrapper} />
        <span className={s.timestamp}>{timestamp.twitter()} ago</span>
        <Dropdown
          item
          icon="ellipsis vertical"
          direction="left"
          className={s.dropdown}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="pencil alternate"
              text="Edit"
              onClick={this.edit}
            />
            <Dropdown.Item icon="trash" text="Remove" onClick={this.remove} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default Header;
