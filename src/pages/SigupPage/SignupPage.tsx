import { FC } from "react"
import { Col, Form, Row } from "antd"
import { Link } from "react-router-dom"
import { Select } from "antd"

import AuthLayout from "../../core/layouts/AuthLayout/AuthLayout"
import "./SignupPage.css"
import { Input } from "../../shared"

const { Option } = Select

const SignupPage: FC = () => {
  return (
    <AuthLayout>
      <div className="loginWrapper">
        <div className="title">Welcome Back</div>
        <div className="loginForm w-96">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ username: "", password: "" }}
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
              label="Email"
              type="email"
              className="mb-3 h-12"
            />
            <Input
              id="username"
              label="Username"
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
              className="mb-3 h-12"
            />

            <button type="submit" className="formSubmitBtn">
              Sign up
            </button>
            <div className="extraInfo flex justify-center pt-3">
              Already have an account? &nbsp;
              <Link to="/login" className="text-blue-800">
                Sign In
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignupPage
