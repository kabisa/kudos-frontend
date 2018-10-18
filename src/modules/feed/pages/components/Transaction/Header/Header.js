import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Image, Dropdown } from "semantic-ui-react";
import moment from "moment-twitter";

import { removeTransaction } from "../../../../actions";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    if (confirm("Are you sure you want to remove this transaction?")) {
      this.props.removeTransaction(this.props.transaction.id);
    }
  }

  render() {
    const { authorUrl, createdOn, kudos, receivers } = this.props.transaction;
    const timestamp = moment(createdOn);

    const receiversList = receivers.map(user => (
      <Image key={user.id} src={user.avatar_url} avatar />
    ));

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "45px" }}>
          <span>{kudos} ₭</span>
        </div>
        <div
          style={{
            marginLeft: "12px",
            display: "flex",
            flexFlow: "wrap",
            maxWidth: "12em"
          }}
        >
          <Image src={authorUrl} avatar />
          {receiversList}
        </div>
        <span
          style={{
            fontWeight: "300",
            fontSize: "12px",
            marginLeft: "auto",
            width: "65px",
            textAlign: "right",
            paddingRight: "8px"
          }}
        >
          {timestamp.twitter()} ago
        </span>
        <Dropdown
          item
          icon="ellipsis vertical"
          direction="left"
          style={{ color: "grey" }}
        >
          <Dropdown.Menu>
            <Dropdown.Item icon="pencil alternate" text="Edit" />
            <Dropdown.Item icon="trash" text="Remove" onClick={this.remove} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  removeTransaction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
