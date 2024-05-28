import { Card } from "../../../ui/Card";
import { RepoList } from "../RepoList/RepoList";

const KudoBoard = () => (
  <Card
    theme={"dark"}
    center={true}
    title={{ text: "Shout out messageboard" }}
    content={<RepoList />}
  />
);

export default KudoBoard;
