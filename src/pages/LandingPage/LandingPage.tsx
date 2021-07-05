import { FC } from "react"
import { Card } from "antd"

import { Input } from "../../shared"
import LandingPageLayout from "../../core/layouts/LandingPageLayout/LandingPageLayout"
import "./LandingPage.css"
import FileIcon from "../../assets/paper.svg"

const LandingPage: FC = () => {
  return (
    <LandingPageLayout>
      <div className="landingPageWrapper mb-3">
        <div className="searchWrapper">
          <Input type="search" placeholder="Search Files..." />
        </div>
        <div className="projectFileWrapper">
          <div className="cardWrapper">
            <Card
              className="projectCard"
              cover={
                <div className="fileIconImg">
                  <img src={FileIcon} alt="Project File representation" />
                </div>
              }
            >
              <div className="flex justify-between items-center px-4 border-t pt-3">
                <span> Circuit #1</span>
                <button className="bg-red-200 text-red-600 py-2 px-3 rounded-lg">
                  Delete File
                </button>
              </div>
            </Card>
          </div>

          <div className="cardWrapper">
            <Card
              className="projectCard"
              cover={
                <div className="fileIconImg">
                  <img src={FileIcon} alt="Project File representation" />
                </div>
              }
            >
              <div className="flex justify-between items-center px-4 border-t pt-3">
                <span> Circuit #1</span>
                <button className="bg-red-200 text-red-600 py-2 px-3 rounded-lg">
                  Delete File
                </button>
              </div>
            </Card>
          </div>
          <div className="cardWrapper">
            <Card
              className="projectCard"
              cover={
                <div className="fileIconImg">
                  <img src={FileIcon} alt="Project File representation" />
                </div>
              }
            >
              <div className="flex justify-between items-center px-4 border-t pt-3">
                <span> Circuit #1</span>
                <button className="bg-red-200 text-red-600 py-2 px-3 rounded-lg">
                  Delete File
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  )
}

export default LandingPage
