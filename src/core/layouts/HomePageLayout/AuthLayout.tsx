import { FC, ReactElement } from "react"

import logo from "../../../logo.svg"

interface HomePageLayoutProps {
  children: ReactElement
}

const HomePageLayout: FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div className="px-4 w-screen h-screen">
      <div className="flex flex-col items-center mt-40 w-full h-full">
        <div>
          <img src={logo} alt="Alternate text" className="" />
          sjds
        </div>
        <div className="content mt-32">{children}</div>
      </div>
    </div>
  )
}

export default HomePageLayout
