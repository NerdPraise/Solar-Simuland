import React, { FC, useState } from "react"
import { Layout, Menu, Modal } from "antd"
import {
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import { bindActionCreators, Dispatch } from "redux"

import "./HomePageLayout.css"
import { createProject as createProjectAction } from "../../../modules/profile/store/actions"
import { AppState } from "../../../redux/rootReducers"
import { connect } from "react-redux"

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

interface HomePageLayoutProps {
  children: React.ReactElement
  extras?: React.ReactElement
  createProject: () => void
}

const HomePageLayout: FC<HomePageLayoutProps> = ({ children, extras, createProject }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const handleCancel = () => setIsVisible(false)
  const toggle = () => setCollapsed(!collapsed)
  const createAndGetProject = () => {
    setIsVisible(true)
    createProject()
  }

  return (
    <div className="w-screen h-screen font-sans">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="h-screen siderLayout"
          width={"20%"}
        >
          <div className="bg-blue-50 text-center text-sm py-3 px-3 flex items-center justify-between searchText font-sans w-full">
            <p>Press ‘/’ to search</p>
            <CloseOutlined />
          </div>
        </Sider>
        <Layout>
          <Header className="headerStyle">
            <div className="w-full flex items-center border-0 h-full">
              <img src="" className="mr-5" />
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger text-white",
                  onClick: toggle,
                }
              )}
              <Menu
                selectedKeys={[""]}
                className="flex border-0 w-full menuStyle text-white text-lg"
                mode="horizontal"
              >
                <SubMenu
                  key="SubMenuFile"
                  title={
                    <div className="flex items-baseline">
                      <span>File</span>
                      <DownOutlined className="ml-1" />
                    </div>
                  }
                >
                  <Menu.ItemGroup
                    title={
                      <div className="flex items-baseline">
                        <span>Edit</span>
                        <DownOutlined className="ml-1" />
                      </div>
                    }
                  >
                    <Menu.Item key="SubMenuFile:1">Option 1</Menu.Item>
                    <Menu.Item key="SubMenuFile:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="SubMenuFile:3">Option 3</Menu.Item>
                    <Menu.Item key="SubMenuFile:4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                  key="SubMenuEdit"
                  title={
                    <div className="flex items-baseline">
                      <span>Edit</span>
                      <DownOutlined className="ml-1" />
                    </div>
                  }
                >
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="SubMenuEdit:1">Option 1</Menu.Item>
                    <Menu.Item key="SubMenuEdit:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="SubMenuEdit:3">Option 3</Menu.Item>
                    <Menu.Item key="SubMenuEdit:4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                  key="SubMenRun"
                  title={
                    <div className="flex items-baseline">
                      <span>Run</span>
                      <DownOutlined className="ml-1" />
                    </div>
                  }
                >
                  <Menu.ItemGroup
                    title={
                      <div className="flex items-baseline">
                        <span>File</span>
                        <DownOutlined className="ml-1" />
                      </div>
                    }
                  >
                    <Menu.Item key="SubMenRun:1">Option 1</Menu.Item>
                    <Menu.Item key="SubMenRun:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="SubMenRun:3">Option 3</Menu.Item>
                    <Menu.Item key="SubMenRun:4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                  key="SubMenuHelp"
                  title={
                    <div className="flex items-baseline">
                      <span>Help</span>
                      <DownOutlined className="ml-1" />
                    </div>
                  }
                >
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="SubMenuHelp:1">Option 1</Menu.Item>
                    <Menu.Item key="SubMenuHelp:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="SubMenuHelp:3">Option 3</Menu.Item>
                    <Menu.Item key="SubMenuHelp:4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="mail">Vendors</Menu.Item>
                <Menu.Item key="app">Navigation Two</Menu.Item>
              </Menu>
              <div className="ml-auto leading-4 leftChange hidden md:block text-white font-thin">
                <div className="m-0 ">
                  Currently Working With Unsaved Changes!
                </div>
                <div className="font-normal">Sign Up or Login</div>
              </div>
            </div>
          </Header>
          <Content>
            {children}
            <Modal
              width={1500}
              visible={isVisible}
              centered
              footer={false}
              onCancel={handleCancel}
            >
              <div>{extras}</div>
            </Modal>
          </Content>
          <Footer
            className="footerLayout"
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              padding: "15px 50px",
            }}
          >
            <div className="allOption">
              <p className="font-bold text-gray-500 font-sans">Load Profiles</p>

              <div className="flex justify-between">
                <button
                  onClick={() => createAndGetProject()}
                  className="bg-white text-gray-300 mr-4 rounded-lg py-2 px-3"
                >
                  Create
                </button>
                <button className="bg-white text-gray-300 hover:bg-blue-100 hover:text-gray-100 rounded-lg py-2 px-3">
                  Upload
                </button>

                <div className="simulateOptions flex w-full flex-row-reverse">
                  <button className="bg-blue-800 ml-4 text-white font-sans px-2 rounded-lg py-2 hover:bg-white hover:text-blue-800 hover:border-blue-800">
                    Stimulate
                  </button>
                  <button className="ml-3 bg-white text-gray-300 rounded-lg py-2 px-3">
                    Build
                  </button>
                  <button></button>
                </div>
              </div>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}


const mapDispatchToProps = (dispatch: Dispatch) => {
  const action = {
    createProject: createProjectAction
  }
  
  return bindActionCreators(action, dispatch)
}

const mapStateToProps = ({project}: AppState) => ({
  project: project.listing.project
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageLayout)
