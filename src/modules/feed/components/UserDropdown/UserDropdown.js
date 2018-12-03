import { h, Component } from "preact";
import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import client from "src/apollo";
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
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleChange(e, { value }) {
    if (!value) {
      return;
    }
    if (value.some(item => isNaN(parseInt(item)))) {
      return;
    }
    this.setState({ value });
    this.props.onChange(value);
  }

  resetState() {
    this.setState(this.initialState);
  }

  handleAddition(e, { value }) {
    const oldState = client.readQuery({
      query: GET_USERS,
      variables: {
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });

    const id = (
      oldState.teamById.users.reduce(
        (min, user) => (parseInt(user.id) < min ? parseInt(user.id) : min),
        parseInt(oldState.teamById.users[0].id)
      ) - 1
    ).toString();

    const newState = {
      ...oldState,
      teamById: {
        ...oldState.teamById,
        users: [
          ...oldState.teamById.users,
          {
            id,
            name: value,
            virtual: true,
            __typename: "User",
          },
        ],
      },
    };

    client.writeQuery({
      query: GET_USERS,
      variables: {
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
      data: newState,
    });

    const updatedState = { value: [...this.state.value, id] };
    this.setState(updatedState);
    this.handleChange(null, updatedState);
  }

  render() {
    return (
      <Query
        query={GET_USERS}
        variables={{
          team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
        }}
      >
        {({ loading, error, data }) => {
          const { value } = this.state;

          let options = [];
          if (data) {
            if (data.teamById) {
              options = data.teamById.users.map(item => ({
                text: item.name,
                value: item.id,
              }));
            }
          }

          return (
            <Dropdown
              id="userdropdown"
              placeholder="Receivers"
              fluid
              selection
              multiple
              allowAdditions
              search
              labeled
              value={value}
              options={options}
              disabled={loading}
              loading={loading}
              error={error || this.props.error}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
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
