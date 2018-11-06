import React from 'react';
import { isAuthenticated } from '~/auth';
import { Route, Redirect } from 'react-router';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/admin/comics/new',
          state: { from: props.location }
        }} />
  )} />
)

export default PublicRoute;
