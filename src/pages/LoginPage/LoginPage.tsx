import { FC } from "react"

import AuthLayout from "../../core/layouts/AuthLayout/AuthLayout"
import LoginContent from "../../modules/auth/Login/Login"

const LoginPage: FC = () => {
  return (
    <AuthLayout>
      <LoginContent />
    </AuthLayout>
  )
}

export default LoginPage
