import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

import { Navigation } from '../../navigation';
import UserDropdown from './components/UserDropdown';

export class AddTransactionPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <div className="page flex">
        <div style={{ padding: '2em' }}>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label htmlFor="input-kudos">
                Kudos Amount
                <input id="input-kudos" placeholder="Kudos" type="number" />
              </label>
            </Form.Field>
            {/* <Form.Dropdown
              placeholder="Select receivers"
              fluid
              multiple
              search
              selection
              options={countryOptions}
              label="Receivers"
            /> */}
            <Form.Field>
              <label htmlFor="input-receivers">
                Receivers
                <UserDropdown id="input-receivers" />
              </label>
            </Form.Field>

            <Form.TextArea label="Message" placeholder="Enter your message" />
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionPage);
