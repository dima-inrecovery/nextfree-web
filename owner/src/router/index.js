import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import * as Pages from './Pages';

import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import Login from '../screens/Login/components';
import Register from '../screens/Register/components';

import Home from '../screens/Home/components';
import QR from '../screens/QR/components';
import QRScanner from '../screens/QRScanner/components';
import Profile from '../screens/Profile/components';
import ProfileSecurity from '../screens/ProfileSecurity/components';

import Staff from '../screens/Staff/components';
import StaffEdit from '../screens/StaffEdit/components';
import StaffInvite from '../screens/StaffInvite/components';

import CompanyEdit from '../screens/CompanyEdit/components';

import Store from '../screens/Store/components';
import StoreEdit from '../screens/StoreEdit/components';

import PasswordReset from '../screens/PasswordReset/components';
import PasswordSet from '../screens/PasswordSet/components';
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

          <PublicRoute exact path={Pages.REGISTER} component={Register}/>

          <PublicRoute path={Pages.ACTIVATION} component={Activation}/>

          <PublicRoute path={Pages.PASSWORD_SET} component={PasswordSet}/>
          <PublicRoute exact path={Pages.PASSWORD_RESET} component={PasswordReset}/>

          <PrivateRoute exact path={Pages.HOME} component={Home}/>
          <PrivateRoute exact path={Pages.QR_CODE} component={QR}/>
          <PrivateRoute exact path={Pages.QR_SCAN} component={QRScanner}/>

          <PrivateRoute exact path={Pages.PROFILE} component={Profile}/>
          <PrivateRoute exact path={Pages.PROFILE_SECURITY} component={ProfileSecurity}/>

          <PrivateRoute exact path={Pages.MY_COMPANY} component={CompanyEdit}/>

          <PrivateRoute exact path={Pages.STORES} component={Store}/>
          <PrivateRoute excat path={Pages.STORE_NEW} component={StoreEdit}/>
          <PrivateRoute path={Pages.STORE_EDIT} component={StoreEdit}/>

          <PrivateRoute exact path={Pages.STAFF} component={Staff}/>
          <PrivateRoute exact path={Pages.STAFF_INVITE} component={StaffInvite}/>
          <PrivateRoute path={Pages.STAFF_EDIT} component={StaffEdit}/>

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