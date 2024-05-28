import settings from "../../config/settings";
import { Storage } from "../../support/storage";

export function selectTeam(id: string, role: string) {
  Storage.setItem(settings.TEAM_ID_TOKEN, id);
  Storage.setItem(settings.ROLE_TOKEN, role);
}
