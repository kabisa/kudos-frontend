import s from "./NotificationsPage.module.scss";
import Page from "../../components/templates/Page";

export interface Props {
  // Future props go here
}

export function NotificationsPage() {
  return (
    <Page>
      <div className={s.container}>
        <h2>&ldquo;Work in progress&ldquo;</h2>
        <h5>- The person who made this empty page, 2018</h5>
      </div>
    </Page>
  );
}

export default NotificationsPage;
