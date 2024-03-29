import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ props }) =>
          localStorage.getItem(ACCESS_TOKEN_NAME) ? (
            children
          ) : (
            <Redirect to={"/login"}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;