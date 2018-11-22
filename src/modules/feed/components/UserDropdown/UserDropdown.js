import { h, Component } from "preact";
import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import { GET_USERS } from "../../queries";
import settings from "src/config/settings";

class DropdownRemote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleChange(e, { value }) {
    if (!value) {
      return;
    }
    this.setState({ value });
    this.props.onChange(value);
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    return (
      <Query
        query={GET_USERS}
        variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
      >
        {({ loading, error, data }) => {
          const { value } = this.state;

          let options = [];
          if (data) {
            if (data.teamById) {
              options = data.teamById.memberships.map(item => ({
                text: item.name,
                value: item.id,
              }));
            }
          }

          const noResultsMessage =
            options.length === 0 ? "Start typing for results." : "No results.";

          return (
            <Dropdown
              fluid
              selection
              multiple
              error={error || this.props.error}
              search
              value={value}
              options={options}
              placeholder="Receivers"
              onChange={this.handleChange}
              disabled={loading}
              loading={loading}
              labeled
              noResultsMessage={noResultsMessage}
              id="userdropdown"
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
