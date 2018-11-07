import React from 'react';
import { isAuthenticated } from '~/auth';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/admin/login',
          state: { from: props.location }
        }} />
  )} />
)

export default PrivateRoute;
