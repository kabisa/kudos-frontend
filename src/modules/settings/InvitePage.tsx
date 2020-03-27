import React from 'react';
import { Navigation, Toolbar } from '../../components/navigation';

import s from './Settings.module.scss';
import { CreateInvite } from '../manage-team/sections/invite/CreateInvite';

export function InvitePage(): React.ReactElement {
  return (
    <div id="root">
      <Toolbar text="Invite members" />
      <div className="main-form">
        <div className={s.page}>
          <CreateInvite data-testid="create-invites" />
        </div>
      </div>
      <Navigation />
    </div>
  );
}
