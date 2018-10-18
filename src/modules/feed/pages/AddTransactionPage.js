import { h, Component } from "preact";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import { Form, Button } from "semantic-ui-react";
import { route } from "preact-router";

import { Toolbar } from "../../../components/navigation";
import { UserDropdown } from "./components";
import { PATH_FEED, PATH_LOGIN } from "../../../routes";
import { setEditTransaction } from "../actions";

import s from "./AddTransactionPage.scss";

export class AddTransactionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      done: false,
      receivers: [],
      message: "",
      amountError: false,
      receiversError: false,
      messageError: false,
    };

    if (props.transaction) {
      this.state.message = props.transaction.message;
      this.state.amount = props.transaction.kudos;
      this.state.receivers = props.transaction.receivers;
    }

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentWillUnmount() {
    this.props.setEditTransaction(null);
  }

  onSubmit() {
    // Validation
    if (this.state.amount === 0) {
      this.setState({ amountError: true });
      return;
    }
    this.setState({ amountError: false });

    if (this.state.receivers.length === 0) {
      this.setState({ receiversError: true });
      return;
    }
    this.setState({ receiversError: false });

    if (this.state.message.length === 0) {
      this.setState({ messageError: true });
      return;
    }
    this.setState({ messageError: false });

    // TODO hook up with backend.
    this.setState({ done: true });
    route(PATH_FEED);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleDropdownChange(value) {
    this.setState({ receivers: value });
  }

  render() {
    const { amountError, receiversError, messageError } = this.state;
    const { transaction } = this.props;
    return (
      <div className={s.root}>
        <Toolbar
          text={transaction ? "Edit transaction" : "Create transaction"}
        />
        <div className={s.page}>
          <Form onSubmit={this.onSubmit} className={s.form}>
            <Form.Field>
              <label htmlFor="input-kudos">
                Kudos Amount
                <Form.Input
                  id="input-kudos"
                  error={amountError}
                  onChange={this.handleChange}
                  placeholder="Kudos"
                  name="amount"
                  type="number"
                  min="0"
                  value={this.state.amount}
                />
              </label>
            </Form.Field>

            <Form.Field>
              <label htmlFor="input-receivers">
                Receivers
                <UserDropdown
                  id="input-receivers"
                  onChange={this.handleDropdownChange}
                  error={receiversError}
                  value={this.state.receivers}
                />
              </label>
            </Form.Field>

            <Form.TextArea
              label="Message"
              placeholder="Enter your message"
              name="message"
              onChange={this.handleChange}
              error={messageError}
              value={this.state.message}
            />

            <Button type="submit" primary className={s.submit_button}>
              {transaction ? "Update" : "Create"}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

AddTransactionPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null,
  transaction: state.feed.transactions.find(
    item => item.id === state.feed.editTransaction
  ),
});

const mapDispatchToProps = {
  setEditTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionPage);
