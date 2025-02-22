import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import * as Pages from "../../../router/Pages";
import Loading from "../../../components/Loading";

class Activation extends React.Component {

  componentDidMount() {
    const {id} = this.props.match.params

    if (id)
      this.props.dispatch(Save(id))
  }

  renderContent() {

    const {isSuccess, isLoading} = this.props.Activation

    if (isLoading) {
      return <Loading/>
    }

    if (isSuccess) {
      return <div className="alert alert-success text-center">
        <h3>{i18n.t('activation.success_title')}</h3>
        <p>{i18n.t('activation.success_subtitle')}</p>

        <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('activation.success_action')}</Link>
      </div>
    } else {
      return <div className="alert alert-danger text-center">
        <h3>{i18n.t('activation.not_found_title')}</h3>
        <p>{i18n.t('activation.not_found_subtitle')}</p>

        <Link to={Pages.LOGIN} className="btn btn-warning">{i18n.t('activation.not_found_action')}</Link>
      </div>
    }
  }

  render() {

    return <div className="container py-5">
      <div className="row no-gutters">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">

          <div className="row">
            <div className="col-12">

              <div className="mb-4">
                <h2 className="h3">{i18n.t('activation.title')}</h2>
              </div>

            </div>
          </div>

          {this.renderContent()}

        </div>
      </div>
    </div>

  }
}

const selectors = createStructuredSelector({
  Activation: store => store.Activation
})

export default withRouter(
  connect(selectors)(Activation)
)
