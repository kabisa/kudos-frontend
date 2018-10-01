import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader, Button, Responsive } from 'semantic-ui-react';
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
    const progress = 10;

    const Transactions = transactions.map(item => <Transaction transaction={item} key={item.id} />);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <Link to={PATH_ADD_TRANSACTION}>
            <Button circular icon="plus" className="add-button" primary size="huge" />
          </Link>
        </Responsive>

        <div className="page">
          <div className="kudo-progress">
            <div className="kudo-progress-bar" style={{ width: `${progress}%` }} />
            <div className="kudo-progress-bar-negative" style={{ width: `${100 - progress}%` }} />
          </div>
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
