import React from 'react';
import {connect} from 'react-redux';
import {MODEL_CHANGED} from '../actions';
import Fetch from '../actions/Fetch';
import Save from '../actions/Save';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import BonusCondition from "../../../components/BonusCondition";
import Errors from "../../../components/Errors";

class CompanyEdit extends React.Component {

  componentDidMount() {

    const {defaultCompany} = this.props

    if (defaultCompany) {
      this.props.dispatch(Fetch(defaultCompany._id))
    }
  }

  deactivate = () => {
    const {model} = this.props.CompanyEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: false
    }))
  }

  activate = () => {
    const {model} = this.props.CompanyEdit

    this.props.dispatch(Save({
      ...model,
      isEnabled: true
    }))
  }

  submit = () => {
    const {model} = this.props.CompanyEdit

    this.props.dispatch(Save(model))
  }

  change = (key, value = null) => this.props.dispatch({
    type: MODEL_CHANGED,
    payload: {
      [key]: value
    }
  })

  changeString = name => e => this.change(name, e.target.value)

  setCondition = value => () => this.change('bonusCondition', value)

  getError = key => {
    const {errors} = this.props.CompanyEdit.validator

    if (errors[key] === undefined) return null

    return <small className="feedback invalid-feedback d-block">{errors[key]}</small>
  }

  render() {

    const {
      model,
      isValid,
      isLoading,
      serverErrors,
    } = this.props.CompanyEdit

    return <div className="container my-3">
      <div className="row">

        <div className="col-12">

          <Errors errors={serverErrors}/>

          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0 text-white">{model.name}</h3>

                  {model.id && model.isEnabled
                    ? <span className="badge badge-success">
                        <i className="fa fa-check"/>&nbsp;{i18n.t('staff.enabled_badge')}
                    </span> : null}

                  {model.id && !model.isEnabled
                    ? <span className="badge badge-danger">
                      <i className="fa fa-times"/>&nbsp;{i18n.t('staff.disabled_badge')}
                    </span> : null}

                </div>
                <div className="col-12 col-md-auto text-right">

                  {model.id && model.isEnabled
                    ? <button className="btn btn-outline-danger btn-sm mx-1"
                              onClick={this.deactivate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-ban"}/>
                      &nbsp;{i18n.t('company_edit.deactivate_action')}
                    </button>
                    : null}

                  {model.id && !model.isEnabled
                    ? <button className="btn btn-outline-success btn-sm mx-1"
                              onClick={this.activate}
                              disabled={isLoading || !isValid}>
                      <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-check"}/>
                      &nbsp;{i18n.t('company_edit.activate_action')}
                    </button>
                    : null}

                  <button className="btn btn-success btn-sm mx-1"
                          onClick={this.submit}
                          disabled={isLoading || !isValid}>
                    <i className={isLoading ? "fa fa-spin fa-circle-notch" : "fa fa-save"}/>
                    &nbsp;{i18n.t('company_edit.save_action')}
                  </button>

                </div>
              </div>
            </div>
            <div className="card-body">

              <div className="row">
                <div className="col-12">

                  <div className="form-group">
                    <label className="m-0 required">{i18n.t('company_edit.name')}</label>
                    <input type="text" placeholder={i18n.t('placeholder.text')}
                           className="form-control"
                           onChange={this.changeString('name')}
                           value={model.name || ''}/>
                    {this.getError('name')}
                  </div>

                </div>
              </div>

            </div>
          </div>


          <div className="card mb-4">
            <div className="card-body">

              <h4 className="card-title">{i18n.t('company_edit.conditions_title')}</h4>
              <h6 className="card-subtitle mb-2 text-muted">{i18n.t('company_edit.conditions_subtitle')}</h6>

              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <BonusCondition
                    onClick={this.setCondition('4+1')}
                    title={i18n.t('bonus_conditions.4+1.title')}
                    content={i18n.t('bonus_conditions.4+1.description')}
                    selected={model.bonusCondition === '4+1'}/>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  defaultCompany: store => store.App.defaultCompany,
  CompanyEdit: store => store.CompanyEdit,
})

export default connect(selectors)(CompanyEdit)