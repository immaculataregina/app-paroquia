import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, isSignedIn, ...rest }) {
  return (
    <Route 
      {...rest}
      render={props => 
        isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect push to={{ pathname: '/', state: { from: props.location }}} />
        )
      }
    />
  )
}

export default ProtectedRoute;