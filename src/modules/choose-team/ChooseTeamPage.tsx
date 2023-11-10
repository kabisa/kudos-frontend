import { useHistory } from "react-router-dom";

import { PATH_CREATE_TEAM } from "../../routes";
import { InviteList, TeamList } from "./components";

import s from "./ChooseTeamPage.module.scss";
import { Button } from "@kabisa/ui-components";
import Page from "../../components/templates/Page";

export function Content() {
  const history = useHistory();

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2>Your invites</h2>
        <InviteList />
      </section>

      <section className={s.section}>
        <h2>Your teams</h2>
        <TeamList />
      </section>

      <span>Or</span>

      <Button
        variant="primary"
        className={s.create_button}
        onClick={() => {
          history.push(PATH_CREATE_TEAM);
        }}
      >
        Create team
      </Button>
    </div>
  );
}

function ChooseTeamPage() {
  return (
    <Page>
      <Content />
    </Page>
  );
}

export default ChooseTeamPage;
