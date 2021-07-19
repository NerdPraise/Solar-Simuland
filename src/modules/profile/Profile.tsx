import { FC, useEffect } from "react"
import { Card, Col, Row } from "antd"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import FileIcon from "../../assets/paper.svg"
import { AppState } from "../../redux/rootReducers"
import { Input } from "../../shared"
import { IProject } from "./models"
import { getProjects as getProjectsAction } from "./store/actions"
import { bindActionCreators, Dispatch } from "redux"
import "./profile.css"

interface ProfileProps {
  projects: IProject[]
  getProjects: () => void
}

const Profile: FC<ProfileProps> = ({ projects, getProjects }) => {
  useEffect(() => getProjects(), [getProjects])
  const projectHtmlView = (
    projects.map((project, index) => {
      return (
        <Col md={{ span: 7 }} sm={{ span: 24 }} key={index}>
          <div
            className="cardWrapper mb-4"
            onClick={() =>
              window.location.replace(
                `projects/${project.load_profile}`
              )
            }
          >
            <Card
              className="projectCard"
              cover={
                <div className="fileIconImg">
                  <img
                    src={FileIcon}
                    alt="Project File representation"
                  />
                </div>
              }
            >
              <div className="projectText">
                <span> #Circuit { index + 1 } </span>
                <button className="bg-red-200 text-red-600 py-2 px-3 rounded-lg">
                  Delete File
                </button>
              </div>
            </Card>
          </div>
        </Col>
      )
    })
  )


  return (
    <div className="landingPageWrapper mb-3">
      <div className="searchWrapper">
        <Input type="search" size="large" placeholder="Search Files..." />
      </div>
      <div className="projectFileWrapper">
        <Row justify="space-between">
          {projects.length > 0 ? (
           projectHtmlView 
          ) : (
            <Col md={{ span: 24 }} sm={{ span: 24 }}>
              <div className="text-center text-gray-300 text-3xl border-2 border-blue-100 py-3 rounded-lg font-sans">
                You don't have any active project
                <div className="mt-3">
                  <Link to="load-profile/new">Create New Project</Link>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  )
}

const mapStateToProps = ({ project }: AppState) => ({
  projects: project.listing.projects,
  statusCode: project.listing.statusCode,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  const actions = {
    getProjects: getProjectsAction,
  }

  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
