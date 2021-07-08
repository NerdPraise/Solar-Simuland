import { ActionTypes, AuthActions } from "./actionTypes"

interface LoginState {
  isLoggedIn: boolean
}

const authInitialState: LoginState = {
  isLoggedIn: false,
}

const authReducer = (
  state: LoginState = authInitialState,
  action: AuthActions
) => {
  switch (action.type) {
    case ActionTypes.LOGIN: {
      const { isLoggedIn } = action.payload

      return { ...state, isLoggedIn }
    }
    default:
      return state
  }
}

export default authReducer
