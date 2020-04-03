import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { hasTeam, isLoggedIn } from '../support';
import { PATH_CHOOSE_TEAM, PATH_LOGIN } from '../routes';

export default function AuthenticatedRoute({ allowNoTeam, component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn()) {
          return <Redirect data-testid="redirect" to={PATH_LOGIN} />;
        }

        if (hasTeam() || allowNoTeam) {
          return <Component data-testid="component" {...props} />;
        }

        return <Redirect data-testid="redirect" to={PATH_CHOOSE_TEAM} />;
      }}
    />
  );
}
