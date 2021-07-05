import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"

interface LandingPageLayoutProps {
  children: ReactElement
}

const LandingPageLayout: FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <div className="landingPageLayoutWrapper">
      <div className="layoutNavbar w-full h-20 shadow bg-white px-10 py-4 font-sans flex items-center justify-between">
        <div className="logo">
          <span className="text-3xl font-thin">
            Welcome <span className="font-semibold">Ade</span>
          </span>
        </div>
        <div className="extraText text-black">
          <span className="mr-5">
            <Link to="/" className="text-black ">
              Vendors
            </Link>
          </span>
          <span className="mr-5">
            <Link
              to="/"
              className="text-black bg-gray-100 hover:bg-black hover:text-gray-100 py-3 px-4 rounded-xl"
            >
              New File
            </Link>
          </span>
          <span>
            <Link
              to="/"
              className="text-white bg-red-600 hover:bg-blue-100 hover:text-black py-3 px-4 rounded-xl"
            >
              Sign out
            </Link>
          </span>
        </div>
      </div>
      <div className="mt-4 px-10">{children}</div>
    </div>
  )
}

export default LandingPageLayout
