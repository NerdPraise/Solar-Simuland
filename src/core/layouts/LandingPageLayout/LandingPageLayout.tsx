/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactElement, useEffect, useRef } from "react"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"

import {logOut as logOutAction}  from '../../../modules/auth/store/actions'
import { AppState } from "../../../redux/rootReducers"
import { StatusCode } from "../../../shared/helpers"

interface LandingPageLayoutProps {
  children: ReactElement
  logOut: () => void
  statusCode: StatusCode
}

const LandingPageLayout: FC<LandingPageLayoutProps> = ({ children, logOut, statusCode }) => {

  const didMount = useRef<boolean>(false)
  const handleLogout = () => logOut()
  const history = useHistory()

  useEffect(() => {
    if (didMount.current) {
      if (statusCode === StatusCode.OK) {
        history.replace('/login')
      }
    } else didMount.current = true
  }, [statusCode]
  )

  return (
    <div className="landingPageLayoutWrapper">
      <div className="layoutNavbar w-full h-20 shadow bg-white px-10 py-4 font-sans flex items-center justify-between">
        <div className="logo">
          <span className="text-3xl font-thin">
            Welcome <span className="font-semibold">Ade</span>
          </span>
        </div>
        <div className="extraText text-black">
          <span className="mr-5">
            <Link to="/" className="text-black ">
              Vendors
            </Link>
          </span>
          <span className="mr-5">
            <Link
              to="load-profile/new/"
              className="text-black hidden bg-gray-100 md:inline-flex hover:bg-black hover:text-gray-100 py-3 px-4 rounded-xl"
            >
              New File
            </Link>
          </span>
          <span>
            <button
              onClick={handleLogout}
              className="text-white hidden bg-red-600 md:inline-flex hover:bg-blue-100 hover:text-black py-3 px-4 rounded-xl"
            >
              Sign out
            </button>
          </span>
        </div>
      </div>
      <div className="mt-4 px-10">{children}</div>
    </div>
  )
}

const mapStateToProps = ({ auth }: AppState) => ({
  statusCode: auth.statusCode
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  const action = {
    logOut: logOutAction
  }
  
  return bindActionCreators(action, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageLayout)
