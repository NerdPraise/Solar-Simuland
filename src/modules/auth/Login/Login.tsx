/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react"
import { Form, message, Button } from "antd"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

import { LoginProps } from "../models"
import { Input } from "../../../shared"
import { AppState } from "../../../redux/rootReducers"
import {
  login as loginActionCreator,
  clearStatusCode as clearStatusCodeAction,
} from "../store/actions"
import { StatusCode, authErrorMessages } from "../../../shared/helpers"
import "./Login.css"

const LoginContent: FC<LoginProps> = ({
  statusCode,
  login,
  location,
  history,
  clearStatusCode,
}) => {
  const didMount = useRef<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (values: any) => {
    setIsLoading(true)
    clearStatusCode()
    login(values)
  }

  useEffect(() => {
    if (didMount.current) {
      if (statusCode === StatusCode.OK) {
        const queryParams = new URLSearchParams(location.search)
        const redirectPath = queryParams.get("rdr") || "/dashboard"
        history.push(redirectPath)
      } else if (statusCode === StatusCode.INITIAL) {
      } else {
        message.error(authErrorMessages[statusCode])
      }
    } else {
      didMount.current = true
    }
  }, [statusCode])

  return (
    <div className="loginWrapper">
      <div className="title">Welcome Back</div>
      <div className="loginForm w-96">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ email: "", password: "" }}
          onFinish={handleSubmit}
          onFinishFailed={handleSubmit}
        >
          <Input
            id="email"
            label="Email"
            type="text"
            name="email"
            className="mb-3 h-12"
          />
          <Input
            label={
              <div className="flex w-full justify-between">
                <span> Password</span>
                <Link to="/" className="font-light">
                  <i>Forgot Password</i>
                </Link>
              </div>
            }
            id="password"
            name="password"
            type="password"
            className="mb-3 h-12"
          />
          <Button
            htmlType="submit"
            loading={isLoading}
            className="formSubmitBtn"
          >
            Sign in
          </Button>
          <div className="extraInfo flex justify-center pt-3">
            Don't have an account? &nbsp;
            <Link to="/register" className="text-blue-800">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth }: AppState) => ({
  statusCode: auth.statusCode,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  const actions = {
    login: loginActionCreator,
    clearStatusCode: clearStatusCodeAction,
  }
  return bindActionCreators(actions, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContent)
)
