import React from "react";
import {Button} from "semantic-ui-react";
import {Mutation} from "react-apollo";
import {toast} from "react-toastify";
import {Redirect} from 'react-router-dom'
import settings from "../../../config/settings";
import {PATH_FEED} from "../../../routes";
import {GET_INVITES} from "./InviteList";

import s from "./ChooseTeam.module.scss";

const ChoiceButton = ({mutation, inviteId, text, color, accept, teamId}) => (
    <Mutation
        mutation={mutation}
        update={(cache, {data: {declineInvite}}) => {
            if (accept) {
                return;
            }
            const oldState = cache.readQuery({query: GET_INVITES});
            const newState = {
                ...oldState,
                viewer: {
                    ...oldState.viewer,
                    self: {
                        ...oldState.viewer.self,
                        teamInvites: oldState.viewer.self.teamInvites.filter(
                            item => item.id !== declineInvite.id
                        ),
                    },
                },
            };
            cache.writeQuery({
                query: GET_INVITES,
                data: newState,
            });
        }}
    >
        {(mutate, {loading}) => {
            if (loading) {
                return (
                    <Button color={color} size="small" className={s.button} loading>
                        {text}
                    </Button>
                );
            }

            return (
                <Button
                    color={color}
                    size="small"
                    className={s.button}
                    onClick={() => {
                        mutate({variables: {team_invite_id: inviteId}});
                        if (accept) {
                            localStorage.setItem(settings.TEAM_ID_TOKEN, teamId);
                            toast.info("Invite successfully accepted!");
                            return <Redirect to={PATH_FEED}/>
                        } else {
                            toast.info("Invite successfully declined!");
                        }
                    }}
                >
                    {text}
                </Button>
            );
        }}
    </Mutation>
);

export default ChoiceButton;
