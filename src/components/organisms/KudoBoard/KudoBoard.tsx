import { Card } from "../../../ui/Card";
import { RepoList } from "../RepoList/RepoList";

const KudoBoard = () => (
  <Card
    theme={"dark"}
    center={true}
    title={{ text: "Shout out messageboard" }}
    content={<RepoList data-testid="repo-list" />}
  />
);

export default KudoBoard;
