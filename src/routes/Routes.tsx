import React from 'react';
import { Switch } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword/ResetPassword';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { Route } from './Route';

export const Routes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
      </Switch>
    </>
  );
};
