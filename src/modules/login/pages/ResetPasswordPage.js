import { h, Component } from "preact";
import { connect } from "preact-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Responsive,
} from "semantic-ui-react";

import { Toolbar } from "../../../components/navigation";
import { login } from "../actions";

import s from "./style.scss";

export class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    const { username, password } = this.state;
    this.props.login(username, password);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { loading, error } = this.props;

    return (
      <div>
        <Toolbar text="Forgot password" />
        <div className="main-form">
          <Grid textAlign="center" className={s.grid} verticalAlign="middle">
            <Grid.Column className={s.column}>
              <Header as="h2" color="teal" textAlign="center">
                Reset password
              </Header>
              <Form size="large" onSubmit={this.onSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    name="username"
                    error={error}
                    iconPosition="left"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Button color="teal" loading={loading} fluid size="large">
                    Reset password
                  </Button>
                </Segment>
              </Form>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Message className={s.back}>
                  <div onClick={() => window.history.back()}>Back</div>
                </Message>
              </Responsive>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loginLoading,
  error: state.login.loginError !== null,
});

const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordPage);
