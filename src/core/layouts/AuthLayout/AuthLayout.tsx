import { FC, ReactElement } from "react"

import logo from "../../../logo.svg"
import "./AuthLayout.css"

interface AuthLayoutProps {
  children: ReactElement
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-full">
      <div className="flex flex-col items-center font-body pt-40 w-full h-screen">
        <div>
          <img src={logo} alt="Alternate text" className="" />
          Solar simuland
        </div>
        <div className="authContent mt-20 px-3">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
