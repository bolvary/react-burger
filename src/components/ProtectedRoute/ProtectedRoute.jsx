import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isLoginUser } from '../../services/Auth/selectors';

const ProtectedRoute = ({ children, ...rest }) => {
  const userLogin =  useSelector(isLoginUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
      userLogin ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
