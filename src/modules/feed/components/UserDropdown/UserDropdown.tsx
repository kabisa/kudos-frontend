import { Component, PropsWithRef } from "react";
import { Query } from "@apollo/client/react/components";

import client from "../../../../client";
import { GetUsersResult, User } from "../../queries";
import settings from "../../../../config/settings";
import { Storage } from "../../../../support/storage";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { GET_USERS } from "../../../../graphql/queries/getUsers.graphql";

export interface DropDownProps extends PropsWithRef<any> {
  onChange: (values: readonly NameOption[]) => void;
  error: boolean;
}

export interface DropDownState {
  values: readonly NameOption[];
}

export type NameOption = { label: string; value: string };

class DropdownRemote extends Component<DropDownProps, DropDownState> {
  initialState: DropDownState;

  constructor(props: DropDownProps) {
    super(props);
    this.state = {
      values: [],
    };
    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleChange(newValues: OnChangeValue<NameOption, true>) {
    if (!newValues) {
      return;
    }
    if (
      newValues.some((item: NameOption) =>
        Number.isNaN(Number.parseInt(item.value, 10)),
      )
    ) {
      return;
    }

    this.setState({ values: newValues });
    this.props.onChange(newValues);
  }

  resetState() {
    this.setState(this.initialState);
  }

  handleAddition(inputValue: string) {
    const oldState = client.readQuery({
      query: GET_USERS,
      variables: {
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
    });

    const existing = oldState.teamById.users.filter(
      (u: User) => u.name === inputValue,
    );
    if (existing.length > 0) {
      return;
    }

    // Manually searching for an available user id?
    // Big no no, fix this to create a new user with a mutation and store the result.
    let id = "-1";
    oldState.teamById.users.forEach((item: User) => {
      const itemId = Number.parseInt(item.id, 10);
      const numberId = Number.parseInt(id, 10);

      if (itemId >= numberId) {
        id = (itemId + 1).toString();
      }
    });

    const newState = {
      ...oldState,
      teamById: {
        ...oldState.teamById,
        users: [
          ...oldState.teamById.users,
          {
            id,
            name: inputValue,
            virtualUser: true,
            __typename: "User",
          },
        ],
      },
    };

    client.writeQuery({
      query: GET_USERS,
      variables: {
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
      data: newState,
    });

    const updatedValues = [
      ...this.state.values,
      { label: inputValue, value: id },
    ];

    this.handleChange(updatedValues);
  }

  render() {
    return (
      <Query<GetUsersResult>
        query={GET_USERS}
        variables={{
          team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
        }}
      >
        {({ loading, data }) => {
          const { values } = this.state;

          let options: NameOption[] = [];
          if (data) {
            if (data.teamById) {
              options = data.teamById.users.map((item) => ({
                label: item.virtualUser ? `${item.name} (v)` : item.name,
                value: item.id,
              }));
            }
          }

          return (
            <CreatableSelect<NameOption, true>
              isMulti
              options={options}
              onCreateOption={this.handleAddition}
              onChange={(e) => this.handleChange(e)}
              value={values}
              isLoading={loading}
              isDisabled={loading}
              placeholder="Receivers"
              data-testid="user-dropdown"
              classNamePrefix="react-select"
              styles={{
                valueContainer: (base) => ({
                  ...base,
                  fontSize: "var(--font-size-s)",
                }),
                control: (base) => ({
                  ...base,
                  border: ".1rem solid var(--subtle-color)",
                }),
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default DropdownRemote;
