import { FC } from "react"

import HomePageLayout from "../../core/layouts/HomePageLayout/HomepageLayout"
import CreateLoadProfile from "../../modules/profile/CreateProfile/CreateProfile"
import EditableTable from "../../shared/EditableTable/EditableTable"

const CreateLoadProfilePage: FC = () => {
  return (
    <HomePageLayout extras={<EditableTable />}>
      <CreateLoadProfile />
    </HomePageLayout>
  )
}

export default CreateLoadProfilePage
