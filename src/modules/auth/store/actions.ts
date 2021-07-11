import { Dispatch } from 'redux'

import { API } from '../../../core/api'
import { StatusCode } from '../../../shared/helpers'
import { ActionTypes } from './actionTypes'


export const login = (formData: { [key: string]: string }) => (dispatch: Dispatch) => {
  API.post("url", formData)
    .then((response) => {
      localStorage.setItem("ACCESS_TOKEN", response.data.access)
      localStorage.setItem("REFRESH_TOKEN", response.data.refresh)

      dispatch({
        type: ActionTypes.LOGIN,
        payload: {
          isLoggedIn: true,
          statusCode: response.data.status,
        },
      })
    })
    .catch((err) =>
      dispatch({
        type: ActionTypes.LOGIN,
        payload: {
          isLoggedIn: false,
          statusCode: err.response
            ? err.response.status
            : StatusCode.BAD_REQUEST,
        },
      })
    )
}
