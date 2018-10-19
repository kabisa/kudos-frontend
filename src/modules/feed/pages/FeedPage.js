import { h, Component } from "preact";
import { connect } from "preact-redux";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";
import { route } from "preact-router";

import { Navigation } from "../../../components/navigation";
import { Transaction, GoalProgress, ActionButton } from "./components";
import { getTransactions } from "../actions";
import { PATH_LOGIN } from "../../../routes";

export class FeedPage extends Component {
  constructor(props) {
    super(props);

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }

    if (this.props.transactions.length < 5) {
      setTimeout(() => {
        this.props.getTransactions();
      });
    }
  }

  render() {
    const { isLoading, isFailed, transactions } = this.props;

    const Transactions = transactions.map(item => (
      <Transaction transaction={item} key={item.id} />
    ));

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ActionButton />

        <div className="page">
          <GoalProgress />
          {isLoading && <Loader active>Loading</Loader>}
          {!isLoading &&
            isFailed && (
              <span style={{ textAlign: "center", lineHeight: "90vh" }}>
                Could not load transactions
              </span>
            )}
          {Transactions}
        </div>
        <Navigation />
      </div>
    );
  }
}

FeedPage.propTypes = {
  getTransactions: PropTypes.func.isRequired,

  isLoading: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.feed.getTransactionsLoading,
  isFailed: state.feed.getTransactionsError !== null,
  transactions: state.feed.transactions,
  isLoggedIn: state.user.token !== null,
});

const mapDispatchToProps = {
  getTransactions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPage);
