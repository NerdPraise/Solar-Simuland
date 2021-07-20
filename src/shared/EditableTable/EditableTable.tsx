import React, { useContext, useState, useEffect, useRef } from "react"
import { Table, Input, Button, Popconfirm, Form } from "antd"
import { FormInstance } from "antd/lib/form"
import { bindActionCreators, Dispatch } from "redux"

import "./EditableTable.css"
import { connect } from "react-redux"
import {
  createLoadProfile as createLoadProfileAction,
  toggleModal as toggleModalAction,
} from "../../modules/profile/store/actions"
import { AppState } from "../../redux/rootReducers"
import { StatusCode } from "../helpers"
import { withRouter, RouteComponentProps } from "react-router-dom"

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  name: string
  age: string
  address: string
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  iType?: "text" | "number"
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  iType,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<Input>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input type={iType} ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

interface extraProps extends RouteComponentProps {
  createLoadProfile: (values: any, id?: number) => void
  project_id?: number
  load_profile?: number
  statusCode: StatusCode
  toggleModal: () => void
}

type EditableTableProps = Parameters<typeof Table>[0] & extraProps

interface DataType {
  key: React.Key
  load_name: string
  load_rating: number
  quantity: number
  hourly_usage: number
  weekly_usage: number
  profile_type: string
  load_profile?: number
  inverter_efficiency?: number
}

interface EditableTableState {
  dataSource: DataType[]
  count: number
  inverter_efficiency: number
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>

class EditableTable extends React.Component<
  EditableTableProps,
  EditableTableState
> {
  columns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex: string
    iType?: "text" | "number"
  })[]

  constructor(props: EditableTableProps) {
    super(props)

    this.columns = [
      {
        title: "Load name",
        dataIndex: "load_name",
        width: "26%",
        editable: true,
        iType: "text",
      },
      {
        title: "Power rating",
        editable: true,
        dataIndex: "load_rating",
        width: "200px",
        iType: "number",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        width: "200px",
        editable: true,
        iType: "number",
      },
      {
        title: "Hourly Usage",
        dataIndex: "hourly_usage",
        width: "200px",
        editable: true,
        iType: "number",
      },
      {
        title: "Weekly usage",
        width: "200px",
        dataIndex: "weekly_usage",
        editable: true,
        iType: "number",
      },
      {
        title: "Type (AC or DC)",
        dataIndex: "profile_type",
        editable: true,
        iType: "text",
      },
      {
        title: "",
        dataIndex: "operation",
        render: (_: any, record: { [key: string]: any }) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ]

    this.state = {
      dataSource: [
        {
          key: "0",
          load_name: "",
          load_rating: 0,
          weekly_usage: 0,
          hourly_usage: 0,
          quantity: 0,
          profile_type: "",
          load_profile: this.props.load_profile,
        },
      ],
      count: 1,
      inverter_efficiency: 0.9,
    }
  }

  handleDelete = (key: React.Key) => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) })
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData: DataType = {
      key: count,
      load_name: "",
      load_rating: 0,
      weekly_usage: 0,
      hourly_usage: 0,
      quantity: 0,
      profile_type: "",
      load_profile: this.props.load_profile,
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    })
  }

  handleSubmit = () => {
    const data = this.state.dataSource.map((info) => {
      if (info["load_profile"] === undefined) {
        info["load_profile"] = this.props.load_profile
      }
      if (info["profile_type"] === "AC") {
        info["inverter_efficiency"] = this.state.inverter_efficiency
      }
      return info
    })
    this.props.createLoadProfile(data, this.props.load_profile)
    this.props.toggleModal()
  }

  handleSave = (row: DataType) => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({ dataSource: newData })
  }

  render() {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    }
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          iType: col.iType,
          handleSave: this.handleSave,
        }),
      }
    })
    console.log(this.props.statusCode)
    return (
      <div>
        <div className="mb-2 w-1/3">
          <label className="font-bold"> Inverter Efficiency</label>
          <Input
            className=""
            placeholder="If empty, 0.9 is used as default"
            onChange={(e: any) =>
              this.setState({
                ...this.state,
                inverter_efficiency: e.target.value,
              })
            }
          />
        </div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          pagination={false}
          scroll={{ x: 1000 }}
        />
        <div className="mt-4">
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Add a row
          </Button>

          <Button
            onClick={this.handleSubmit}
            className="ml-4"
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ project }: AppState) => ({
  load_profile: project.listing.project?.load_profile,
  project_id: project.listing.project?.id,
  statusCode: project.listing.statusCode,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  const action = {
    createLoadProfile: createLoadProfileAction,
    toggleModal: toggleModalAction,
  }

  return bindActionCreators(action, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditableTable)
)
