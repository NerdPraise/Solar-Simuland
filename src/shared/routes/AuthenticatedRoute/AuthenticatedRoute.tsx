import { FC } from "react"
import {connect} from 'react-redux'

import { AppState } from '../../../redux/rootReducers'
import { StatusCode } from "../../helpers"

interface AuthenticatedRouteProps {
  isLoggedIn: boolean
  isCheckingLoginStatus: boolean
  statusCode: StatusCode
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
  isLoggedIn,
  isCheckingLoginStatus
}) => {
  return <div className="s">s</div>
}

const mapStateToProps = ({ auth }: AppState) => ({
  isLoggedIn: auth.isLoggedIn,
  statusCode: auth.statusCode,
})

export default connect(mapStateToProps)(AuthenticatedRoute)