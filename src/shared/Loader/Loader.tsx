import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

import "./Loader.css"

export const Loader: React.FC = () => {
  return (
    <div className="auth-loader">
      <img src={""} alt="`logo" className="loading-screen-logo" />
      <Spin indicator={<LoadingOutlined className="spinner" />} />
    </div>
  )
}
