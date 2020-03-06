import settings from "../../config/settings";

export const selectTeam = (id, role) => {
  localStorage.setItem(settings.TEAM_ID_TOKEN, id);
  localStorage.setItem(settings.ROLE_TOKEN, role);
};
