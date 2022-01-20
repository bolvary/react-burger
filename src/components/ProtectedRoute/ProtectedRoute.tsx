import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isLoginUser } from '../../services/Auth/selectors';

type TProtectedRoute = {
  children: ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<TProtectedRoute> = ({ children, ...rest }) => {
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
