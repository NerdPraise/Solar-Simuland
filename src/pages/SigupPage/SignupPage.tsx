import { FC } from "react"

import AuthLayout from "../../core/layouts/AuthLayout/AuthLayout"
import SignupPage from "../../modules/auth/Sigup/SignupPage"

const SignUpContent: FC = () => {
  return (
    <AuthLayout>
      <SignupPage />
    </AuthLayout>
  )
}

export default SignUpContent
