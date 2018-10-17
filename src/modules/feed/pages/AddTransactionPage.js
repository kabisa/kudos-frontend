import { h, Component } from "preact";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import { Form, Button } from "semantic-ui-react";

import { Toolbar } from "../../../components/navigation";
import { UserDropdown } from "./components";
import { PATH_FEED, PATH_LOGIN } from "../../../routes";
import { route } from "preact-router";

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
      messageError: false
    };

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
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
    return (
      <div
        className="flex"
        style={{ justifyContent: "center", textAlign: "center" }}
      >
        <Toolbar text="Create a transaction" />
        <div
          style={{
            padding: "2em",
            display: "flex",
            height: "100vh"
          }}
        >
          <Form
            onSubmit={this.onSubmit}
            style={{ margin: "auto", width: "100%" }}
          >
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
                />
              </label>
            </Form.Field>

            <Form.TextArea
              label="Message"
              placeholder="Enter your message"
              name="message"
              onChange={this.handleChange}
              error={messageError}
            />
            <Button type="submit" primary style={{ width: "100%" }}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

AddTransactionPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionPage);
