import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'

export default (id, data) => (dispatch) => {

  dispatch({
    type: SAVE_BEFORE
  })

  request.post(parameters.apiHost + `/api/v1/staff-password-set/${id}`, data)
    .then(({data}) => {
      dispatch({
        type: SAVE_SUCCESS,
        payload: data,
      })
    })
    .catch(e => {
      console.log(e);



      dispatch({
        type: SAVE_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
