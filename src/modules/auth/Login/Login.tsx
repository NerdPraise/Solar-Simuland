import { FC } from "react"
import { Form } from "antd"
import { Link } from "react-router-dom"

import "./Login.css"
import { Input } from "../../../shared"

const LoginContent: FC = () => {
  return (
    <div className="loginWrapper">
      <div className="title">Welcome Back</div>
      <div className="loginForm w-96">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ username: "", password: "" }}
        >
          <Input
            id="username"
            label="Username"
            type="text"
            className="mb-3 h-12"
          />
          <Input
            label={
              <div className="flex justify-between">
                <span> Password</span>
                <Link to="/" className="font-light">
                  <i>Forgot Password</i>
                </Link>
              </div>
            }
            id="password"
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

export default LoginContent
