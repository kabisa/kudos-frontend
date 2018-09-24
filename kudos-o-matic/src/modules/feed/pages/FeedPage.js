import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

import { Navigation } from '../../navigation';
import Transaction from './Transaction';

import { getTransactions } from '../actions';

export class FeedPage extends Component {
  componentWillMount() {
    this.props.getTransactions();
  }

  render() {
    const { isLoading, isFailed, transactions } = this.props;

    const Transactions = transactions.map(item => <Transaction transaction={item} key={item.id} />);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="page">
          {isLoading && <Loader active>Loading</Loader>}
          {!isLoading &&
            isFailed && (
              <span style={{ textAlign: 'center', lineHeight: '90vh' }}>
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
  transactions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.feed.getTransactionsLoading,
  isFailed: state.feed.getTransactionsError !== null,
  transactions: state.feed.transactions
});

const mapDispatchToProps = {
  getTransactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPage);
