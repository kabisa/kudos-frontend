import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

import axios from '../../../../axios';
import { API_USER_SEARCH } from '../../../../config';

class DropdownRemote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      searchQuery: null,
      value: [],
      options: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
  }

  handleChange(e, { value }) {
    this.setState({ value });
  }

  handleSearchChange(e, { searchQuery }) {
    this.setState({ searchQuery });
    this.fetchOptions();
  }

  fetchOptions() {
    this.setState({ isFetching: true });

    axios.get(API_USER_SEARCH).then(resp => {
      const options = [];
      resp.data.forEach(item => {
        options.push({
          text: `${item.first_name} ${item.last_name}`,
          value: item.id,
          image: { avatar: true, src: item.avatar_url }
        });
      });

      this.setState({ isFetching: false, options });
    });
  }

  render() {
    const { options, isFetching, value } = this.state;

    const noResultsMessage = options.length === 0 ? 'Start typing for results.' : 'No results.';

    return (
      <Dropdown
        fluid
        selection
        multiple
        search
        options={options}
        value={value}
        placeholder="Receivers"
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        disabled={isFetching}
        loading={isFetching}
        labeled
        noResultsMessage={noResultsMessage}
      />
    );
  }
}

export default DropdownRemote;
