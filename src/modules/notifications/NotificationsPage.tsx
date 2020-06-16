import React from 'react';

import { Navigation } from '../../components/navigation';

import s from './NotificationsPage.module.scss';

export interface Props {
  // Future props go here
}

export function NotificationsPage() {
  return (
    <div>
      <div className={s.page}>
        <div style={{
          height: '5em', display: 'flex', justifyContent: 'center', flexDirection: 'column',
        }}
        >
          <h2 style={{ margin: 'auto' }}>&ldquo;Work in progress&ldquo;</h2>
          <h5 style={{ margin: 'auto' }}>- The person who made this empty page, 2018</h5>
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export default NotificationsPage;
