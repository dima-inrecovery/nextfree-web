import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import * as Pages from './Pages';

import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import Login from '../screens/Login/components';

import Home from '../screens/Home/components';
import QR from '../screens/QR/components';
import QRScanner from '../screens/QRScanner/components';
import Profile from '../screens/Profile/components';
import ProfileSecurity from '../screens/ProfileSecurity/components';

import PasswordSet from '../screens/PasswordSet/components';
import PasswordReset from '../screens/PasswordReset/components';
import Invitation from '../screens/Invitation/components';
import Activation from '../screens/Activation/components';

import ErrorBoundary from "../components/ErrorBoundary";

export function createRouter(store) {

  const PrivateRoute = ({component: Component, ...rest}) => {

    const appState = store.getState().App

    if (appState.isLoadingVisible) return <Loading/>

    if (appState.isAuthenticated === true) {
      return <Route {...rest} render={(props) => <Component {...props}/>}/>
    }

    return <Redirect to={Pages.LOGIN}/>
  }

  const PublicRoute = ({component: Component, ...rest}) => {

    const appState = store.getState().App

    if (appState.isLoadingVisible) return <Loading/>

    if (appState.isAuthenticated === false) {
      return <Route {...rest} render={(props) => <Component {...props}/>}/>
    }

    return <Redirect to={Pages.HOME}/>
  }

  return <div>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <PublicRoute exact path={Pages.LOGIN} component={Login}/>

          <PublicRoute path={Pages.PASSWORD_SET} component={PasswordSet}/>
          <PublicRoute exact path={Pages.PASSWORD_RESET} component={PasswordReset}/>

          <PublicRoute path={Pages.INVITATION} component={Invitation}/>
          <PublicRoute path={Pages.ACTIVATION} component={Activation}/>

          <PrivateRoute exact path={Pages.HOME} component={Home}/>
          <PrivateRoute exact path={Pages.QR_CODE} component={QR}/>
          <PrivateRoute exact path={Pages.QR_SCAN} component={QRScanner}/>

          <PrivateRoute exact path={Pages.PROFILE} component={Profile}/>
          <PrivateRoute exact path={Pages.PROFILE_SECURITY} component={ProfileSecurity}/>

          <Redirect path="*" to={Pages.HOME}/>

        </Switch>
      </ErrorBoundary>

    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </div>
}