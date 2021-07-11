import { StatusCode } from "../../../shared/helpers"
import { AuthState } from "../models"
import { ActionTypes, AuthActions } from "./actionTypes"


const authInitialState: AuthState = {
  isLoggedIn: false,
  statusCode: StatusCode.INITIAL,
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
    default:
      return state
  }
}

export default authReducer
