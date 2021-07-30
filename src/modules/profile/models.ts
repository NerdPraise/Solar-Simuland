import { StatusCode } from "../../shared/helpers"

export interface ProjectListState {
  projects: IProject[]
  statusCode: StatusCode
  loadStatusCode: StatusCode
  project: IProject | null
  load: ILoad | null
  loads: ILoad[]
  isDoneShowTable: boolean
  showModal: boolean
  loadProfile: ILoadProfile | null
  models: SolarModel[]
  selectedModel: SolarModel | null
}

export interface IProject {
  id: number
  user: number
  load_profile: number
}

export interface ILoadProfile {
  id: number
  loads: ILoad[]
  total_demand: number
  name: string
  user: number
  array_sizing: number
  battery_capacity: number
  cable_sizing: number
  inverter_rating: number
  no_of_panels: number
  panel_output: number
  peak_sun_hours: number
  inverter_efficiency: number
}

export interface SolarModel {
  id: string | number
  image: string
  isc: string
  pveff: string
  power_rating: number
  plan_file: string
  peak_generation_factor: string
  name: string
}

export interface ILoad {
  id: 10
  load_name: string
  load_rating: number
  quantity: number
  hourly_usage: number
  weekly_usage: number
  profile_type: string
  total_usage: number
  inverter_efficiency: number
  load_profile: number
}

export interface IProjectState {
  listing: ProjectListState
}
