import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import * as Pages from '../../../router/Pages';
import {createStructuredSelector} from "reselect";
import img from "../../../assets/img/scanner.jpg";

const Home = (props) => {

  const {firstName, email} = props.admin.user

  return <div className="container py-5 text-center">
    <div className="row">
      <div className="col-12">
        <h1 className="mb-4">{i18n.t('home.welcome_title').replace('_NAME_', firstName || email)}</h1>
      </div>
      <div className="col-11 col-md-8 col-lg-6 mx-auto">
        <img src={img} alt="" className="img-fluid shadow mb-4"/>

        <Link className="btn btn-success btn-lg"
              to={Pages.QR_SCAN}>{i18n.t('home.action')}</Link>
      </div>
    </div>
  </div>

}

const selectors = createStructuredSelector({
  admin: store => store.App.admin
})

export default connect(selectors)(Home)
