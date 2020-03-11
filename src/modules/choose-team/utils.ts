import settings from "../../config/settings";

export const selectTeam = (id: string, role: string) => {
    localStorage.setItem(settings.TEAM_ID_TOKEN, id);
    localStorage.setItem(settings.ROLE_TOKEN, role);
};
