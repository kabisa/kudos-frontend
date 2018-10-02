import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { Navigation } from '../../navigation';
import UserDropdown from './components/UserDropdown';
import { PATH_FEED } from '../../../routes';

export class AddTransactionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      done: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  onSubmit() {
    console.log(this.state);
    this.setState({ done: true });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleDropdownChange(value) {
    this.setState({ receivers: value });
  }

  render() {
    const { done } = this.state;
    if (done) {
      return <Redirect to={PATH_FEED} push={false} />;
    }

    return (
      <div className="page flex" style={{ justifyContent: 'center' }}>
        <div style={{ padding: '2em' }}>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label htmlFor="input-kudos">
                Kudos Amount
                <Form.Input
                  id="input-kudos"
                  onChange={this.handleChange}
                  placeholder="Kudos"
                  name="amount"
                  type="number"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="input-receivers">
                Receivers
                <UserDropdown id="input-receivers" onChange={this.handleDropdownChange} />
              </label>
            </Form.Field>

            <Form.TextArea
              label="Message"
              placeholder="Enter your message"
              name="message"
              onChange={this.handleChange}
            />
            <Button type="submit" primary>
              Submit
            </Button>
          </Form>
        </div>
        <Navigation />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionPage);
