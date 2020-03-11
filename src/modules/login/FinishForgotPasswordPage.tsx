import React, {Component} from "react";
import {Button, Form, Message, Segment} from "semantic-ui-react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {PATH_LOGIN} from "../../routes";
import {withRouter} from "react-router-dom";
import {History} from "history"
import {toast} from "react-toastify";

import {FormWrapper} from "../../components";
import BackButton from "./BackButton";

const DEFAULT_ERROR = "Something went wrong.";
const PASSWORD_ERROR = "Passwords don't match.";
const EMPTY_ERROR = "Fields can't be empty.";

const MUTATION_NEW_PASSWORD = gql`
  mutation NewPassword($reset_password_token: String!, $password: String!, $password_confirmation: String!) {
    newPassword(resetPasswordToken: $reset_password_token, password: $password, passwordConfirmation: $password_confirmation) {
      user {
        id
      }
    }
  }
`;

export interface NewPasswordResult {
    user: {
        id: string;
    }
}

export interface NewPasswordParameters {
    reset_password_token: string;
    password: string;
    password_confirmation: string;
}


export interface Props {
    reset_password_token: string;
    history: History;
}

export interface State {
    password: string;
    password_confirm: string;
    error: string;
}

class FinishForgotPasswordPage extends Component<Props, State> {
    token: string;

    constructor(props: Props) {
        super(props);

        this.state = {
            password: "",
            password_confirm: "",
            error: "",
        };

        this.token = props.reset_password_token || "";

        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onCompleted = this.onCompleted.bind(this);
    }

    handleChange(e: any, {name, value}: any) {
        // @ts-ignore
        this.setState({[name]: value});
    }

    onCompleted(data: any) {
        if (data.newPassword) {
            this.props.history.push(PATH_LOGIN);
            toast.info("Successfully reset password!");
        } else {
            this.setState({error: DEFAULT_ERROR});
        }
    }

    formSubmit(e: any, mutation: any) {
        e.preventDefault();

        const {password, password_confirm} = this.state;

        if (!password || !password_confirm) {
            this.setState({error: EMPTY_ERROR});
            return;
        }

        if (password !== password_confirm) {
            this.setState({error: PASSWORD_ERROR});
            return;
        }

        mutation({
            variables: {
                reset_password_token: this.token,
                password: password,
                password_confirmation: password_confirm,
            },
        });
    }

    render() {
        const {error: formError} = this.state;
        return (
            <FormWrapper header="Reset password">
                <Mutation <NewPasswordResult, NewPasswordParameters>
                    mutation={MUTATION_NEW_PASSWORD}
                    onCompleted={data => this.onCompleted(data)}
                    onError={() => this.setState({error: DEFAULT_ERROR})}
                >
                    {(mutation, {error, loading}) => (
                        <div>
                            <Form
                                size="large"
                                // @ts-ignore
                                error={error}
                                onSubmit={e => this.formSubmit(e, mutation)}
                            >
                                <Segment>
                                    <Form.Input
                                        fluid
                                        icon="lock"
                                        name="password"
                                        type="password"
                                        iconPosition="left"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="lock"
                                        name="password_confirm"
                                        type="password"
                                        iconPosition="left"
                                        placeholder="Confirm password"
                                        value={this.state.password_confirm}
                                        onChange={this.handleChange}
                                    />
                                    <Button
                                        color="blue"
                                        fluid
                                        size="large"
                                        loading={loading}
                                        disabled={loading}
                                    >
                                        Reset password
                                    </Button>

                                    {formError && (
                                        <Message
                                            negative
                                            header="Unable to reset the password."
                                            content={this.state.error}
                                        />
                                    )}
                                </Segment>
                            </Form>
                            <BackButton/>
                        </div>
                    )}
                </Mutation>
            </FormWrapper>
        );
    }
}

// @ts-ignore
export default withRouter(FinishForgotPasswordPage);
