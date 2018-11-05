import { h, Component } from "preact";
import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import { GET_USERS } from "../../queries";

class DropdownRemote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { value }) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    return (
      <Query query={GET_USERS}>
        {({ loading, error, data }) => {
          const { value } = this.state;

          const options = data.users
            ? data.users.map(item => ({
                text: item.name,
                value: item.id,
              }))
            : [];

          const noResultsMessage =
            options.length === 0 ? "Start typing for results." : "No results.";

          return (
            <Dropdown
              fluid
              selection
              multiple
              error={error}
              search
              value={value}
              options={options}
              placeholder="Receivers"
              onChange={this.handleChange}
              disabled={loading}
              loading={loading}
              labeled
              noResultsMessage={noResultsMessage}
            />
          );
        }}
      </Query>
    );
  }
}

DropdownRemote.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

export default DropdownRemote;
