import { StatusCode } from "../../../shared/helpers";

export enum ActionTypes {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN UP",
}

export interface LoginAction {
  type: ActionTypes.LOGIN
  payload: {
    isLoggedIn: boolean
    statusCode: StatusCode
  }
}

export type AuthActions = LoginAction
