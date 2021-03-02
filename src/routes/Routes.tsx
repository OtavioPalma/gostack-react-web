import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignIn } from '../pages/SignIn/SignIn';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
  </Switch>
);
