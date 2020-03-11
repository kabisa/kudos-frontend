import React, {Component, PropsWithRef, SyntheticEvent} from "react";
import {Dropdown} from "semantic-ui-react";
import {Query} from "react-apollo";

import client from "../../../../apollo";
import {GET_USERS, GetUsersResult, User} from "../../queries";
import settings from "../../../../config/settings";

export interface DropDownProps extends PropsWithRef<any> {
    onChange: (value: []) => void;
    error: boolean;
}

export interface DropDownState {
    value: string[]
}

class DropdownRemote extends Component <DropDownProps, DropDownState> {
    initialState: DropDownState;

    constructor(props: DropDownProps) {
        super(props);
        this.state = {
            value: [],
        };
        this.initialState = this.state;

        this.handleChange = this.handleChange.bind(this);
        this.resetState = this.resetState.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleChange(e: SyntheticEvent, {value}: any) {
        if (!value) {
            return;
        }
        if (value.some((item: string) => isNaN(parseInt(item)))) {
            return;
        }

        this.setState({value});
        this.props.onChange(value);
    }

    resetState() {
        this.setState(this.initialState);
    }

    handleAddition(e: React.KeyboardEvent<HTMLElement>, {value}: any) {
        const oldState = client.readQuery({
            query: GET_USERS,
            variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
            },
        });

        let id = "0";
        oldState.teamById.users.forEach((item: User) => {
            if (parseInt(item.id) >= parseInt(id)) {
                id = (parseInt(item.id) + 1).toString();
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
                        name: value,
                        virtualUser: true,
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

        const updatedState = {value: [...this.state.value, id]};
        this.setState(updatedState);
        // @ts-ignore
        this.handleChange(null, updatedState);
    }

    render() {
        return (
            <Query<GetUsersResult>
                query={GET_USERS}
                variables={{
                    team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                }}
            >
                {({loading, error, data}) => {
                    const {value} = this.state;

                    let options: { text: string, value: string }[] = [];
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
                            error={!!error || this.props.error}
                            onAddItem={this.handleAddition}
                            onChange={this.handleChange}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default DropdownRemote;
