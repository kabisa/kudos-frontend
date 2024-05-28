import { Toolbar } from "../../components/navigation";

import { CreateInvite } from "../manage-team/sections/invite/CreateInvite";
import Page from "../../components/templates/Page";

export function InvitePage() {
  return (
    <Page>
      <Toolbar text="Invite members" />
      <div className="form-container">
        <CreateInvite data-testid="create-invites" />
      </div>
    </Page>
  );
}
