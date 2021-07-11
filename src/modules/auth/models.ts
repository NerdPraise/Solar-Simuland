import { StatusCode } from "../../shared/helpers";

export interface AuthState {
  isLoggedIn: boolean
  statusCode: StatusCode
}

export interface LoginProps {
  isLoggedIn: boolean
  statusCode: StatusCode
  login: (formData: {[key: string]: string}) => void
}