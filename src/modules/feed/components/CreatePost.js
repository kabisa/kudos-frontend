import { h, Component } from "preact";
import { Form, Button, Message } from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import settings from "../../../config/settings";
import UserDropdown from "./UserDropdown/UserDropdown";
import GuidelineInput from "./GuidelineInput/GuidelineInput";
import { PATH_FEED } from "../../../routes";
import { auth, getGraphqlError } from "../../../support";
import BackButton from "../../login/BackButton";
import { CREATE_POST, GET_GOAL_PERCENTAGE } from "../queries";

import s from "../AddTransactionPage.scss";

export class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      amount: 0,
      done: false,
      receivers: [],
      message: "",
      amountError: false,
      receiversError: false,
      messageError: false,
      error: null,
    };

    this.state = this.initialState;

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
    this.onCompleted = this.onCompleted.bind(this);
  }

  onSubmit(createPost) {
    const { amount, receivers, message } = this.state;
    this.setState({
      amountError: false,
      receiversError: false,
      messageError: false,
      error: null,
    });

    if (amount == 0) {
      this.setState({
        amountError: true,
        error: "Amount can't be empty or 0.",
      });
      return;
    }

    if (receivers.length === 0) {
      this.setState({
        receiversError: true,
        error: "You must select at least one receiver.",
      });
      return;
    }

    if (message.length < settings.MIN_POST_MESSAGE_LENGTH) {
      if (message.length === 0) {
        this.setState({ messageError: true, error: "Message can't be blank." });
        return;
      }
      this.setState({
        messageError: true,
        error: `Message must be at least ${
          settings.MIN_POST_MESSAGE_LENGTH
        } characters.`,
      });
      return;
    }

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
    toast.success("Post created succesfully!");
    this.input.resetState();
    this.userdropdown.resetState();
    this.setState(this.initialState);
    route(PATH_FEED, true);
  }

  render() {
    const { amountError, receiversError, messageError } = this.state;
    const { transaction } = this.props;
    return (
      <Mutation
        mutation={CREATE_POST}
        onCompleted={this.onCompleted}
        onError={data => this.setState({ error: data })}
        update={(cache, { data: postData }) => {
          const beforeState = cache.readQuery({
            query: GET_GOAL_PERCENTAGE,
            variables: {
              team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
            },
          });
          const afterState = {
            ...beforeState,
            teamById: {
              ...beforeState.teamById,
              activeKudosMeter: {
                ...beforeState.teamById.activeKudosMeter,
                amount:
                  beforeState.teamById.activeKudosMeter.amount +
                  postData.createPost.amount,
              },
            },
          };
          cache.writeQuery({
            query: GET_GOAL_PERCENTAGE,
            variables: {
              team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
            },
            data: afterState,
          });
        }}
      >
        {(createPost, { loading, error }) => {
          let displayError;
          if (error) {
            displayError = getGraphqlError(error);
          }
          if (this.state.error) {
            displayError = this.state.error;
          }
          return (
            <Form onSubmit={() => this.onSubmit(createPost)} className={s.form}>
              <GuidelineInput
                amountError={amountError}
                handleChange={this.handleKudoInputChange}
                ref={c => (this.input = c)}
              />
              <Form.Field>
                <label htmlFor="input-receivers">
                  Receivers
                  <UserDropdown
                    ref={c => (this.userdropdown = c)}
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

              <Button
                type="submit"
                primary
                className={s.submit_button}
                loading={loading}
                disabled={loading}
              >
                {transaction ? "Update" : "Create"}
              </Button>

              {displayError && (
                <Message negative>
                  <Message.Header>Coulnd&apos;t create post</Message.Header>
                  <p>{displayError}</p>
                </Message>
              )}
              {this.props.back && <BackButton />}
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

CreatePost.propTypes = {
  back: PropTypes.bool,
};

export default CreatePost;
