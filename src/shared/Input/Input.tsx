import { FC, ReactElement } from "react"
import { Input as AntdInput, InputProps as AntdInputProps } from "antd"

import "./Input.css"

interface InputProps extends AntdInputProps {
  className?: string
  label?: ReactElement | string
}

export const Input: FC<InputProps> = ({
  className,
  label,
  size,
  ...otherProps
}) => {
  return (
    <>
      <label className="w-full">{label}</label>
      <AntdInput
        className={`inputDefaultStyle ${className}`}
        size={size || "large"}
        {...otherProps}
      />
    </>
  )
}
