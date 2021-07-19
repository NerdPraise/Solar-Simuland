import { FC } from "react"

import LandingPageLayout from "../../core/layouts/LandingPageLayout/LandingPageLayout"
import Profile from "../../modules/profile/Profile"

const LandingPage: FC = () => {
  return (
    <LandingPageLayout>
      <Profile />
    </LandingPageLayout>
  )
}

export default LandingPage
