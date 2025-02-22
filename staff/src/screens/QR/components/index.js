import React from 'react';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import QrCode from "../../../components/QrCode";

const QR = (props) => {

  const {_id, user} = props.staff

  const data = JSON.stringify({staff: _id, user: user._id})

  return <div className="container py-5">
    <div className="row">
      <div className="col-11 col-md-8 col-lg-6 cpl-xl-5 mx-auto mb-4">

        <QrCode data={data}/>

      </div>
    </div>

    <div className="row">
      <div className="col-12 text-center">

        <p className="text-muted">{i18n.t('qr.help')}</p>

      </div>
    </div>
  </div>

}

const selectors = createStructuredSelector({
  staff: store => store.App.staff
})

export default connect(selectors)(QR)
