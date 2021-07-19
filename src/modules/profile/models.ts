import { StatusCode } from "../../shared/helpers"

export interface ProjectListState {
  projects: IProject[]
  statusCode: StatusCode
  project: IProject | null
  load: ILoad | null
  loads: ILoad[]
  isDoneShowTable: boolean
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
}

export interface ILoad {
  id: 10,
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