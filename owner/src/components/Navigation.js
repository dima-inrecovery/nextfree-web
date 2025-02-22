import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import * as Pages from "../router/Pages";
import {LOGOUT, TOGGLE_MENU} from "../screens/Login/actions";

const Navigation = (props) => {

  const hideMobileNavigation = () => {
    props.dispatch({
      type: TOGGLE_MENU,
      payload: false
    })
  }

  const toggleMobileNavigation = () => {
    const {isMobileMenuVisible} = props.Nav

    props.dispatch({
      type: TOGGLE_MENU,
      payload: !isMobileMenuVisible
    })
  }

  const logout = () => {
    props.dispatch({
      type: LOGOUT
    })
  }

  const {isAuthenticated} = props
  const {isMobileMenuVisible} = props.Nav

  return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

    <a className="navbar-brand py-0" href="https://nextfree.com.ua">
      {i18n.t('navigation.logo')}
      <br/><small className="text-info">{i18n.t('navigation.logo_footer')}</small>
    </a>

    <button className="navbar-toggler"
            type="button"
            onClick={toggleMobileNavigation}>
      <i className="fa fa-bars"/>
    </button>

    <div className={"navbar-collapse collapse" + (isMobileMenuVisible ? " show" : "")}>
      <ul className="navbar-nav mr-auto text-center">

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.QR_SCAN}
                className="nav-link text-white"
                onClick={hideMobileNavigation}>
            <i className="fa fa-camera"/>&nbsp;{i18n.t('navigation.qr_scanner')}
          </Link>
        </li>}

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.QR_CODE}
                className="nav-link text-white"
                onClick={hideMobileNavigation}>
            <i className="fa fa-qrcode"/>&nbsp;{i18n.t('navigation.qr')}
          </Link>
        </li>}

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.PROFILE}
                className="nav-link text-white"
                onClick={hideMobileNavigation}>{i18n.t('navigation.profile')}</Link>
        </li>}

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.MY_COMPANY}
                className="nav-link text-white"
                onClick={hideMobileNavigation}>{i18n.t('navigation.companies')}</Link>
        </li>}

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.STORES}
                className="nav-link text-white"
                onClick={hideMobileNavigation}>{i18n.t('navigation.stores')}</Link>
        </li>}

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.STAFF}
                className="nav-link text-white"
                onClick={hideMobileNavigation}>{i18n.t('navigation.staff')}</Link>
        </li>}

      </ul>
      <ul className="navbar-nav ml-auto text-center">

        {!isAuthenticated && <li className="nav-item mx-1 mb-1 mb-lg-0">
          <Link className="btn btn-outline-success"
                onClick={hideMobileNavigation}
                to={Pages.LOGIN}>{i18n.t('navigation.login')}</Link>
        </li>}

        {!isAuthenticated && <li className="nav-item mx-1 mb-1 mb-lg-0">
          <Link className="btn btn-success"
                onClick={hideMobileNavigation}
                to={Pages.REGISTER}>{i18n.t('navigation.register')}</Link>
        </li>}

        {isAuthenticated && <li className="nav-item mx-1 mb-1 mb-lg-0">
          <button className="btn btn-outline-success"
                  onClick={logout}>{i18n.t('navigation.logout')}</button>
        </li>}

      </ul>
    </div>
  </nav>
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
  Nav: store => store.Nav,
})

export default connect(selectors)(Navigation)
