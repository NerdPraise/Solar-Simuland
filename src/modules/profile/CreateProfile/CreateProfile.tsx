import { FC, useRef, useState, useLayoutEffect } from "react"
import { InboxOutlined } from "@ant-design/icons"
import { Modal, Upload } from "antd"
import { Link } from "react-router-dom"

import { usePan, useScale } from "../../../core/hooks"
import GridImage from "../../../assets/grid.png"

const { Dragger } = Upload
const ORIGIN = Object.freeze({ x: 0, y: 0 })

const CreateLoadProfile: FC = () => {
  const [offset, startPan] = usePan()
  const [buffer, setBuffer] = useState(ORIGIN)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const scale = useScale(ref)

  const handleCancel = () => setIsModalVisible(false)
  useLayoutEffect(() => {
    const height = ref.current?.clientHeight ?? 0
    const width = ref.current?.clientWidth ?? 0

    // This is the application of the above formula!
    setBuffer({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2,
    })
  }, [scale, setBuffer])

  return (
    <div className="loadProfileWrapper">
      <div className="header">
        <div
          ref={ref}
          onMouseDown={startPan}
          className="h-screen"
          style={{ position: "relative" }}
        >
          <Modal
            width={1000}
            centered
            visible={isModalVisible}
            footer={false}
            onCancel={handleCancel}
          >
            <div>
              <Link to="/load-profile/new">
                <div className="text-center m-3 text-2xl font-sans">
                  Create load profile
                </div>
              </Link>
              <div className="text-center m-3 text-xl font-bold">OR</div>

              <Dragger>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag image with your load profile to this area to
                  upload
                </p>
                <p className="ant-upload-hint text-gray-400">
                  Our industry standard OCR can detect and build your load
                  profile from any type of image
                </p>
              </Dragger>
              <p className="text-gray-400 text-center text-xs">
                Images should be less than 500kb. Recommendations: 600px X 600px
                jpg, jpeg or png on white background.
              </p>
            </div>
          </Modal>
          <div
            style={{
              backgroundImage: `url(${GridImage})`,
              transform: `scale(${scale})`,
              backgroundPosition: `${-offset.x}px ${-offset.y}px`,
              position: "absolute",
              bottom: buffer.y,
              left: buffer.x,
              right: buffer.x,
              top: buffer.y,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export { CreateLoadProfile as default }
