import { StatusCode } from "../../../shared/helpers"
import { AuthState } from "../models"
import { ActionTypes, AuthActions } from "./actionTypes"


const authInitialState: AuthState = {
  isLoggedIn: false,
  statusCode: StatusCode.INITIAL,
  isCheckingLoginStatus: false,
}

const authReducer = (
  state: AuthState = authInitialState,
  action: AuthActions
) => {
  switch (action.type) {
    case ActionTypes.LOGIN: {
      const { isLoggedIn, statusCode } = action.payload

      return { ...state, isLoggedIn, statusCode }
    }
    case ActionTypes.CHECK_LOGIN_STATUS: {
      const { isLoggedIn, isCheckingLoginStatus } = action.payload

      return { ...state, isLoggedIn, isCheckingLoginStatus }
    }
    case ActionTypes.CHECK_LOGIN_STATUS_PENDING: {
      const { isCheckingLoginStatus } = action.payload

      return { ...state, isCheckingLoginStatus }
    }
    case ActionTypes.CLEAR_STATUS_CODE: {
      const { statusCode } = action.payload

      return { ...state, statusCode }
    }
    case ActionTypes.LOG_OUT: {
      return {...state, isLoggedIn: false}
    }
    default:
      return state
  }
}

export default authReducer
