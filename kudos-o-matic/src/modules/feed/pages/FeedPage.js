import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { TransactionProp } from '../../../proptypes';
import { Navigation } from '../../navigation';
import { Transaction } from './components';
import { getTransactions } from '../actions';
import { PATH_ADD_TRANSACTION } from '../../../routes';

import './FeedPage.css';

export class FeedPage extends Component {
  componentWillMount() {
    if (this.props.transactions.length === 0) {
      this.props.getTransactions();
    }
  }

  render() {
    const { isLoading, isFailed, transactions } = this.props;

    const Transactions = transactions.map(item => <Transaction transaction={item} key={item.id} />);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={PATH_ADD_TRANSACTION}>
          <Button circular icon="plus" className="add-button" primary size="huge" />
        </Link>

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
  transactions: PropTypes.arrayOf(TransactionProp).isRequired
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
