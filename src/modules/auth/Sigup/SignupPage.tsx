import { FC, useState, useEffect, useRef } from "react"
import { Button, Col, Form, message, Row } from "antd"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { Select } from "antd"

import "./SignupPage.css"
import { Input } from "../../../shared"
import { signUpErrorMessages, StatusCode } from "../../../shared/helpers"
import { AppState } from "../../../redux/rootReducers"
import {
  signUp as signUpAction,
  clearStatusCode as clearStatusCodeAction,
} from "../store/actions"

const { Option } = Select

interface SignUpProps extends RouteComponentProps {
  statusCode: StatusCode
  signUp: (values: { [key: string]: string }) => void
  clearStatusCode: () => void
}

const SignupPage: FC<SignUpProps> = ({
  statusCode,
  history,
  signUp,
  clearStatusCode,
}) => {
  const didMount = useRef<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (values: any) => {
    setIsLoading(true)
    clearStatusCode()
    const { username, email, password } = values
    const formData = {
      username,
      email,
      password,
    }
    signUp(formData)
  }

  useEffect(() => {
    if (didMount.current) {
      if (statusCode === StatusCode.CREATED) {
        history.push("/login")
        message.success("Successful registration, please log in")
      } else if (statusCode === StatusCode.INITIAL) {
      } else {
        message.error(signUpErrorMessages[statusCode])
        setIsLoading(false)
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
          initialValues={{ username: "", password: "" }}
          onFinish={handleSubmit}
        >
          <Row justify="space-between">
            <Col span={11}>
              <Input
                id="fname"
                label="First Name"
                type="text"
                className="mb-3 h-12"
              />
            </Col>
            <Col span={11}>
              <Input
                id="lname"
                label="Last Name"
                type="text"
                className="mb-3 h-12"
              />
            </Col>
          </Row>
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            className="mb-3 h-12"
          />
          <Input
            id="username"
            label="Username"
            name="username"
            type="username"
            className="mb-3 h-12"
          />
          <Select
            size="large"
            defaultValue="UK"
            onChange={() => true}
            className="selectFormInput"
          >
            <Option value="us">US</Option>
            <Option value="uk">UK</Option>
            <Option value="german">Germany</Option>
          </Select>
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            className="mb-3 h-12"
          />
          <Button
            htmlType="submit"
            loading={isLoading}
            size="large"
            className="formSubmitBtn"
          >
            Sign in
          </Button>
          <div className="extraInfo flex justify-center pt-3">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-800">
              Sign In
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
  const action = {
    signUp: signUpAction,
    clearStatusCode: clearStatusCodeAction,
  }
  return bindActionCreators(action, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignupPage)
)
