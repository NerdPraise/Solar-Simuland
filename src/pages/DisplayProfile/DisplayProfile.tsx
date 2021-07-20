import { FC } from "react"

import HomePageLayout from "../../core/layouts/HomePageLayout/HomepageLayout"
import DisplayProfile from "../../modules/profile/DisplayProfile/DisplayProfile"

const DisplayProfilePage: FC = () => {
  return (
    <HomePageLayout>
      <DisplayProfile />
    </HomePageLayout>
  )
}

export default DisplayProfilePage
