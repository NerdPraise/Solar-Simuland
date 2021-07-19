/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"

import { AppState } from "../../../redux/rootReducers"
import { checkLoginStatus as checkLoginStatusAction } from "../../../modules/auth/store/actions"
import { Loader } from "../../Loader"

interface UnauthenticatedRouteProps extends RouteProps {
  isLoggedIn: boolean
  checkLoginStatus: () => void
  isCheckingLoginStatus?: boolean
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
  isLoggedIn,
  checkLoginStatus,
  isCheckingLoginStatus,
  location,
  ...otherProps
}) => {
  const [hasCheckedLoginStatus, setHasCheckedLoginStatus] =
    useState<boolean>(false)
  const didMount = useRef<boolean>(false)

  useEffect(() => {
    if (!isLoggedIn) {
      checkLoginStatus()
    } else {
      setHasCheckedLoginStatus(true)
    }
  }, [hasCheckedLoginStatus])

  useEffect(() => {
    if (didMount.current) {
      if (!isCheckingLoginStatus) {
        setHasCheckedLoginStatus(true)
      }
    } else didMount.current = true
  })

  const { component, ...rest } = otherProps

  if (hasCheckedLoginStatus) {
    if (isLoggedIn) {
      return <Redirect to="/dashboard" />
    }
    return <Route component={component} {...rest} />
  }

  return <Loader />
}

const mapStateToProps = ({ auth }: AppState) => ({
  isCheckingLoginStatus: auth.isCheckingLoginStatus,
  isLoggedIn: auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  const neededActions = {
    checkLoginStatus: checkLoginStatusAction,
  }

  return bindActionCreators(neededActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnauthenticatedRoute)
