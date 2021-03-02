import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);
