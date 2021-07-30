import { FC } from "react"
import { connect } from "react-redux"
import { Collapse } from "antd"

import { SolarModel } from "../../../../modules/profile/models"
import { bindActionCreators, Dispatch } from "redux"
import { withRouter } from "react-router-dom"
import { setSelected as setSelectedAction } from "../../../../modules/profile/store/actions"
import { AppState } from "../../../../redux/rootReducers"

const { Panel } = Collapse

interface SiderInfoProps {
  models: SolarModel[]
  setSelected: (id: string | number) => void
}

export const SiderInfo: FC<SiderInfoProps> = ({ models, setSelected }) => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
  return (
    <div>
      <Collapse accordion defaultActiveKey={["1"]} bordered={false}>
        <Panel header="PV Modules" key="1">
          {models.map((model) => (
            <div
              className="mb-5 hover:bg-blue-200 px-2 items-center cursor-pointer"
              key={model.id}
            >
              <div className="ml-auto mb-3 font-bold">{model.name}</div>
              <div className="flex justify-between ">
                <div>
                  <img
                    onClick={() => setSelected(model.id)}
                    src={model.image}
                    width="100%"
                    alt=""
                    className="imageextra"
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-semibold mr-2">Isc:</span> {model.isc}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold mr-2">PVEff: </span>
                    {model.pveff}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold mr-2">PGF:</span>
                    {model.peak_generation_factor}
                  </div>
                  <div className="flex justify-between">
                    <a
                      className="font-semibold mr-2"
                      target="_blank"
                      href={model.plan_file}
                    >
                      Download plan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Panel>
        <Panel header="Controller Models" key="2">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  const action = {
    setSelected: setSelectedAction,
  }

  return bindActionCreators(action, dispatch)
}

const mapStateToProps = ({ project }: AppState) => ({
  models: project.listing.models,
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SiderInfo)
)
