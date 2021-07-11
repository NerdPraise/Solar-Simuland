import { FC } from "react"
import { Form } from "antd"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { LoginProps } from "../models"
import { Input } from "../../../shared"
import { AppState } from "../../../redux/rootReducers"
import { login as loginActionCreator } from "../store/actions"
import "./Login.css"

const LoginContent: FC<LoginProps> = ({
  isLoggedIn,
  statusCode,
  login
}) => {
  console.log(isLoggedIn, statusCode, login)

  const handleSubmit = (values: any) => {
    console.log(values)

  }

  return (
    <div className="loginWrapper">
      <div className="title">Welcome Back</div>
      <div className="loginForm w-96">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ username: "", password: "" }}
          onFinish={handleSubmit}
          onFinishFailed={handleSubmit}
        >
          <Input
            id="username"
            label="Username"
            type="text"
            name="username"
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
          <button type="submit" className="formSubmitBtn">
            Sign in
          </button>
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

const mapStateToProps = ({auth}: AppState) => ({
  isLoggedIn: auth.isLoggedIn,
  statusCode: auth.statusCode
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  const actions = {
    login: loginActionCreator
  }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContent)
