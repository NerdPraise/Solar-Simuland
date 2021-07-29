/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react"
import {
  Card,
  Col,
  Slider,
  Table,
  Tooltip,
  Radio,
  Row,
  Space,
  Input,
} from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"

import { tableColumns } from "./helper"
import { ILoadProfile } from "../../../modules/profile/models"

interface GeneratedInfoProps {
  loadProfile: ILoadProfile | null
}

const QuestionTooTip: FC<{ text: string }> = ({ text }) => {
  return (
    <Tooltip title={text} className="ml-1">
      <QuestionCircleOutlined style={{ fontSize: "12px" }} />
    </Tooltip>
  )
}

export const GeneratedInfo: FC<GeneratedInfoProps> = ({ loadProfile }) => {
  const [arraySize, setArraySize] = useState<number>(1)
  const [inverterRange, setInverterRange] = useState<number>(0.25)
  const [inverterSize, setInverterSize] = useState<number>(0)
  const [batterySize, setBatterySize] = useState<number>(0)
  const [panelRating, setPanelRating] = useState<number>(50)
  const [PSH, setPSH] = useState<number>(1)
  const [NBV, setNBV] = useState<number>(1)
  const [DOA, setDOA] = useState<number>(0.25)
  const [DOD, setDOD] = useState<number>(3)

  const data = loadProfile?.loads.map((load, index) => {
    return {
      key: index,
      load_name: load.load_name,
      load_rating: load.load_rating,
      quantity: load.quantity,
      hourly_usage: load.hourly_usage,
      weekly_usage: load.weekly_usage,
      profile_type: load.profile_type,
    }
  })

  useEffect(() => {
    const panelOutput = panelRating * PSH * 0.75
    if (loadProfile) setArraySize(loadProfile?.total_demand / panelOutput)
  }, [PSH, panelRating])

  useEffect(() => {
    if (loadProfile) {
      setInverterSize(
        loadProfile?.total_demand + loadProfile?.total_demand * inverterRange
      )
    }
  }, [inverterRange])

  useEffect(() => {
    if (loadProfile) {
      const batterySizing =
        (DOA * loadProfile.total_demand) /
        (loadProfile?.inverter_efficiency * DOD * NBV)
      setBatterySize(batterySizing)
    }
  }, [DOA, DOD, NBV])

  return (
    <div>
      <Card>
        <Table
          columns={tableColumns}
          scroll={{ x: 1000 }}
          dataSource={data}
          pagination={false}
        />
        <div className="requiredInfo">
          <Row justify="space-between">
            <Col sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="mt-9 w-full">
                <p>
                  Peak sun hours
                  <Tooltip
                    className="ml-2"
                    title="What is the average peak sun hours at location to be installed?"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </p>
                <Slider
                  className="w-2/3"
                  min={1}
                  max={15}
                  step={0.5}
                  onChange={(value) => setPSH(value)}
                  tipFormatter={(value) => `${value} hr`}
                />
              </div>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 12 }}>
              <div className="mt-9 w-full">
                <p>
                  Solay panel wattage
                  <Tooltip
                    className="ml-2"
                    title="What is the power rating of the panel you want to use?"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </p>
                <Slider
                  className="w-2/3"
                  min={50}
                  max={450}
                  step={50}
                  defaultValue={panelRating}
                  onChange={(value) => setPanelRating(value)}
                  tipFormatter={(value) => `${value} W`}
                />
              </div>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 11 }}>
              <div className="mt-9 w-full">
                <p>
                  Days of autonomy
                  <Tooltip
                    className="ml-2"
                    title="What is the average amount of days for the battery supply with no external power input?"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </p>
                <Slider
                  className="w-2/3"
                  min={1}
                  max={4}
                  step={0.5}
                  defaultValue={DOA}
                  onChange={(value) => setDOA(value)}
                  tipFormatter={(value) => `${value} day(s)`}
                />
              </div>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 12 }}>
              <div className="mt-9 w-full">
                <p>
                  Solay array wattage
                  <Tooltip
                    className="ml-2"
                    title="What is the power rating of the array you want to use?"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </p>
                <Slider
                  className="w-2/3"
                  min={50}
                  max={450}
                  step={50}
                  tipFormatter={(value) => `${value} W`}
                />
              </div>
            </Col>
          </Row>
        </div>
        <Row justify="space-between">
          <Col className="mt-9" sm={{ span: 12 }} md={{ span: 6 }}>
            <div>
              <p className="font-bold">Total watt hours</p>
              <p>{loadProfile?.total_demand.toFixed(2)} Wh</p>
            </div>
          </Col>
          <Col className="mt-9" sm={{ span: 12 }} md={{ span: 6 }}>
            <div>
              <p className="font-bold">Recommended inverter rating(30%)</p>
              <p>{loadProfile?.inverter_rating.toFixed(2)} W</p>
            </div>
          </Col>
          <Col className="mt-9" sm={{ span: 12 }} md={{ span: 6 }}>
            <div>
              <p className="font-bold">Battery Sizing</p>
              <p>
                {batterySize.toFixed(2)} W
                <Tooltip
                  className="ml-2"
                  title="Adjust DOA to get battery size"
                >
                  <QuestionCircleOutlined size={1} />
                </Tooltip>
              </p>
              <small className="text-gray-300">
                Depth of discharge is taken at 85%
              </small>
            </div>
          </Col>
          <Col className="mt-9" sm={{ span: 12 }} md={{ span: 6 }}>
            <div>
              <p className="font-bold">Recommended array size</p>
              <p>{Math.ceil(arraySize)} panels</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Row className="mt-9" justify="space-between">
        <Col sm={{ span: 11 }} md={{ span: 7 }}>
          <Card className="h-full cardSize">
            <div className="inverter-sizing">
              <p className="font-bold">Inverter Sizing</p>
              <div className="mb-3">
                <Input name="batterySize" value={inverterSize.toFixed(2)} />
              </div>

              <Radio.Group
                onChange={(e) => setInverterRange(e.target.value)}
                value={inverterRange}
              >
                <Space direction="vertical">
                  <Radio value={0.25}>25%</Radio>
                  <Radio value={0.27}>27%</Radio>
                  <Radio value={0.3}>30%</Radio>
                </Space>
              </Radio.Group>
              <div>
                <button className="border px-2 mt-2 absolute bottom-3">
                  OK
                </button>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={{ span: 11 }} md={{ span: 7 }}>
          <Card className="h-full cardSize">
            <div className="battery-sizing">
              <p className="font-bold">Battery Sizing</p>
              <Input name="batterySize" value={batterySize.toFixed(2)} />
              <div className="mt-4">
                <Row justify="space-between">
                  <Col>
                    <div className="font-semibold flex mb-2">
                      <span>DOD</span>
                      <QuestionTooTip text="Discharge of Depth" />
                    </div>
                    <Radio.Group
                      onChange={(e) => setDOD(e.target.value)}
                      value={DOD}
                    >
                      <Space direction="vertical">
                        <Radio value={0.25}>25%</Radio>
                        <Radio value={0.5}>50%</Radio>
                        <Radio value={0.75}>75%</Radio>
                      </Space>
                    </Radio.Group>
                  </Col>

                  <Col>
                    <div className="font-semibold flex mb-2">
                      <span>NBV</span>
                      <QuestionTooTip text="Norminal battery voltage" />
                    </div>
                    <Radio.Group
                      onChange={(e) => setNBV(e.target.value)}
                      value={NBV}
                    >
                      <Space direction="vertical">
                        <Radio value={1}>1</Radio>
                        <Radio value={2}>2</Radio>
                        <Radio value={3}>3</Radio>
                        <Radio value={4}>4</Radio>
                      </Space>
                    </Radio.Group>
                  </Col>
                  <Col>
                    <div className="font-semibold flex mb-2">
                      <span>DOA</span>
                      <QuestionTooTip text="Days of Autonomy" />
                    </div>
                    <Radio.Group
                      onChange={(e) => setDOA(e.target.value)}
                      value={DOA}
                    >
                      <Space direction="vertical">
                        <Radio value={1}>1</Radio>
                        <Radio value={2}>2</Radio>
                        <Radio value={3}>3</Radio>
                        <Radio value={4}>4</Radio>
                      </Space>
                    </Radio.Group>
                  </Col>
                </Row>
              </div>

              <button className="border px-2 mt-2 absolute  bottom-3">
                OK
              </button>
            </div>
          </Card>
        </Col>

        <Col sm={{ span: 11 }} md={{ span: 7 }}>
          <Card className="h-full">
            <div className="inverter-sizing"></div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
