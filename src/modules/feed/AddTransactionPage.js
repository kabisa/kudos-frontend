import { h, Component } from "preact";
import { Form, Button } from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";

import settings from "../../config/settings";
import { Toolbar } from "../../components/navigation";
import { UserDropdown, GuidelineInput } from "./components";
import { PATH_FEED } from "../../routes";
import { auth } from "../../support";
import BackButton from "../login/BackButton";
import { CREATE_POST } from "./queries";

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

    auth();

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleKudoInputChange = this.handleKudoInputChange.bind(this);
  }

  onSubmit(createPost) {
    // Validation
    if (this.state.amount == 0) {
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

    createPost({
      variables: {
        message: this.state.message,
        kudos: parseInt(this.state.amount),
        receivers: this.state.receivers,
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleDropdownChange(value) {
    if (!value) {
      this.setState({ receivers: [] });
      return;
    }
    const newReceivers = value.map(item => parseInt(item));
    this.setState({ receivers: newReceivers });
  }

  handleKudoInputChange(amount) {
    this.setState({ amount });
  }

  onCompleted() {
    route(PATH_FEED, true);
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
          <Mutation mutation={CREATE_POST} onCompleted={this.onCompleted}>
            {createPost => (
              <Form
                onSubmit={() => this.onSubmit(createPost)}
                className={s.form}
              >
                <GuidelineInput
                  amountError={amountError}
                  handleChange={this.handleKudoInputChange}
                />
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
                <BackButton />
              </Form>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
export default AddTransactionPage;
