import { FC, ReactElement } from "react"
import { Input as AntdInput, InputProps as AntdInputProps, Form } from "antd"

import "./Input.css"

interface InputProps extends AntdInputProps {
  className?: string
  label?: ReactElement | string
  name?: string
}

export const Input: FC<InputProps> = ({
  className,
  label,
  size,
  name,
  ...otherProps
}) => {
  return (
    <Form.Item name={name} label={label}>
      <AntdInput
        className={`inputDefaultStyle ${className}`}
        size={size || "large"}
        {...otherProps}
      />
    </Form.Item>
  )
}
