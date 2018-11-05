import { h, Component } from "preact";
import { Query } from "react-apollo";

import { Navigation } from "../../components/navigation";
import { Transaction, GoalProgress, ActionButton } from "./components";
import { GET_TRANSACTIONS } from "./queries";
import { auth } from "../../support";

export class FeedPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ActionButton />
        <div className="page">
          <GoalProgress />
          <Query query={GET_TRANSACTIONS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              const Transactions = data.postsConnection.edges.map(item => (
                <Transaction transaction={item.node} key={item.id} />
              ));
              return <div>{Transactions}</div>;
            }}
          </Query>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default FeedPage;
