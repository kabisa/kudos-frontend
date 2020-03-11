import client from "../apollo";
import {History} from "history"
import settings from "../config/settings";
import {PATH_CHOOSE_TEAM, PATH_FEED, PATH_LOGIN} from "../routes";

export const isLoggedIn = (): boolean => {
    return localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;
};

export const hasTeam = (): boolean =>
    localStorage.getItem(settings.TEAM_ID_TOKEN) !== null;

export const auth = (teamAdmin = false, history: History) => {
    if (settings.environment === "test") {
        return true;
    }

    if (!isLoggedIn()) {
        history.push(PATH_LOGIN)
    }
    if (!hasTeam()) {
        history.push(PATH_CHOOSE_TEAM)
    }
    if (teamAdmin) {
        if (!isTeamAdmin()) {
            history.push(PATH_FEED)
        }
    }
    return true;
};

export const isTeamAdmin = (): Boolean => {
    return localStorage.getItem(settings.ROLE_TOKEN) === "admin";
};

export const authIsTeamAdmin = (): Boolean => {
    return localStorage.getItem(settings.ROLE_TOKEN) === "admin";
};

export const logout = (history?: History) => {
    localStorage.clear();
    client.resetStore();
    window.location.href = '/login';
    window.location.reload();

    history?.push(PATH_LOGIN)
};
