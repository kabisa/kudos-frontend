import React from 'react';

import { Navigation } from '../../components/navigation';

import s from './NotificationsPage.module.scss';

export interface Props {
  // Future props go here
}

export function NotificationsPage() {
  return (
    <div>
      <div className="page padding">
        <div className={s.container}>
          <h2>&ldquo;Work in progress&ldquo;</h2>
          <h5>- The person who made this empty page, 2018</h5>
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export default NotificationsPage;
