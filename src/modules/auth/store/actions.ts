import { Dispatch } from 'redux'

import { API } from '../../../core/api'
import { StatusCode } from '../../../shared/helpers'
import { ActionTypes } from './actionTypes'


export const login = (formData: { [key: string]: string }) => (dispatch: Dispatch) => {
  API.post("token/", formData)
    .then((response) => {
      localStorage.setItem("ACCESS_TOKEN_KEY", response.data.access)
      localStorage.setItem("REFRESH_TOKEN", response.data.refresh)

      dispatch({
        type: ActionTypes.LOGIN,
        payload: {
          isLoggedIn: true,
          statusCode: response.status,
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

export const checkLoginStatus = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.CHECK_LOGIN_STATUS_PENDING,
    payload: {
      isCheckingLoginStatus: true,
    },
  })

  API.get('projects/').then(
    (response) => dispatch({
      type: ActionTypes.CHECK_LOGIN_STATUS,
      payload: {
        isLoggedIn: true,
        isCheckingLoginStatus: false
      }
    })
  ).catch(() => {
    dispatch({
      type: ActionTypes.CHECK_LOGIN_STATUS,
      payload: {
        isLoggedIn: false,
        isCheckingLoginStatus: false,
      },
    })
  })
}

export const clearStatusCode = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.CLEAR_STATUS_CODE,
    payload: {
      statusCode: StatusCode.INITIAL,
    },
  })
}

export const logOut = () => (dispatch: Dispatch) => {
  localStorage.removeItem('REFRESH_TOKEN')
  localStorage.removeItem('ACCESS_TOKEN_KEY')

  dispatch({
    type: ActionTypes.LOG_OUT
  })
}