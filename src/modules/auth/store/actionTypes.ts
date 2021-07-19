import { StatusCode } from "../../../shared/helpers";

export enum ActionTypes {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN UP",
  CHECK_LOGIN_STATUS = "CHECK LOGIN STATUS",
  CHECK_LOGIN_STATUS_PENDING = "CHECK LOGIN STATUS PENDING",
  CLEAR_STATUS_CODE = "CLEAR STATUS CODE",
  LOG_OUT = "LOG OUT",
}

export interface LoginAction {
  type: ActionTypes.LOGIN
  payload: {
    isLoggedIn: boolean
    statusCode: StatusCode
  }
}

export interface CheckLoginStatusAction {
  type: ActionTypes.CHECK_LOGIN_STATUS
  payload: {
    isCheckingLoginStatus: boolean
    isLoggedIn: boolean
  }
}

export interface CheckLoginStatusPendingAction {
  type: ActionTypes.CHECK_LOGIN_STATUS_PENDING
  payload: {
    isCheckingLoginStatus: boolean
  }
}

export interface ClearStatusCodeAction {
  type: ActionTypes.CLEAR_STATUS_CODE
  payload: {
    statusCode: StatusCode
  }
}

export interface LogOutAction {
  type: ActionTypes.LOG_OUT
}


export type AuthActions =
  | LoginAction
  | CheckLoginStatusAction
  | CheckLoginStatusPendingAction
  | ClearStatusCodeAction
  | LogOutAction
