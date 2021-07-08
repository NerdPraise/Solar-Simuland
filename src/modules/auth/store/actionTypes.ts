export enum ActionTypes {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN UP",
}

export interface LoginAction {
  type: ActionTypes.LOGIN
  payload: { isLoggedIn: boolean }
}

export type AuthActions = LoginAction
