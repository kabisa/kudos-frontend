import React from 'react';

import { Toolbar } from '../../components/navigation';
import { CreatePost } from './components';

import s from './AddTransactionPage.module.scss';

export interface Props {
  transaction: any;
}

export function AddTransactionPage(props: Props): React.ReactElement {
  const { transaction } = props;

  return (
    <div className={s.root}>
      <Toolbar text={transaction ? 'Edit transaction' : 'Create transaction'} />
      <div className={s.page}>
        <CreatePost back />
      </div>
    </div>
  );
}

export default AddTransactionPage;
