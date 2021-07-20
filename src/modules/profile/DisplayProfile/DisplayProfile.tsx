import { FC, useRef, useState, useLayoutEffect } from "react"

import { usePan, useScale } from "../../../core/hooks"
import GridImage from "../../../assets/grid.png"
import "./DisplayProfile.css"

const ORIGIN = Object.freeze({ x: 0, y: 0 })

const DisplayLoadProfile: FC = () => {
  const [offset, startPan] = usePan()
  const [buffer, setBuffer] = useState(ORIGIN)
  const ref = useRef<HTMLDivElement | null>(null)
  const scale = useScale(ref)

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
          className="panWrapper"
          style={{ position: "relative" }}
        >
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
            className="flex items-center justify-center"
          ></div>
        </div>
      </div>
    </div>
  )
}

export { DisplayLoadProfile as default }
