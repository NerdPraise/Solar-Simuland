import { RouteComponentProps } from "react-router-dom";
import { StatusCode } from "../../shared/helpers";

export interface AuthState {
  isLoggedIn: boolean
  statusCode: StatusCode
  hasCheckedLoginStatus?: boolean
  isCheckingLoginStatus?: boolean
}

export interface LoginProps extends RouteComponentProps {
  statusCode: StatusCode
  clearStatusCode: () => void
  login: (formData: {[key: string]: string}) => void
}