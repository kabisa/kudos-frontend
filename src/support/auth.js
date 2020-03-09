import client from "../apollo";
import React from "react";
import {Redirect} from "react-router-dom";
import settings from "../config/settings";
import {PATH_LOGIN, PATH_CHOOSE_TEAM, PATH_FEED} from "../routes";

export const isLoggedIn = () => {
    return localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;
};

export const hasTeam = () =>
    localStorage.getItem(settings.TEAM_ID_TOKEN) !== null;

export const auth = (teamAdmin = false) => {
    if (settings.environment === "test") {
        return true;
    }

    if (!isLoggedIn()) {
        return <Redirect to={PATH_LOGIN}/>;
    }
    if (!hasTeam()) {
        return <Redirect to={PATH_CHOOSE_TEAM}/>;
    }
    if (teamAdmin) {
        if (!isTeamAdmin()) {
            return <Redirect to={PATH_FEED}/>;
        }
    }
    return true;
};

export const authAllowNoTeam = () => {
    if (settings.environment === "test") {
        return true;
    }

    if (!isLoggedIn()) {
        return <Redirect to={PATH_LOGIN}/>;
    }
    return true;
};

export const isTeamAdmin = () => {
    return localStorage.getItem(settings.ROLE_TOKEN) === "admin";
};

export const authIsTeamAdmin = () => {
    return localStorage.getItem(settings.ROLE_TOKEN) === "admin";
};

export const logout = (history) => {
    localStorage.clear();
    client.resetStore();
    history.push(PATH_LOGIN)
};
