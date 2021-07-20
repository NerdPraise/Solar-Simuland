import { StatusCode } from "../../../shared/helpers"
import { ILoad, ILoadProfile, IProject, ProjectListState } from "../models"

export enum ActionTypes {
  LIST_PROJECT = "LIST PROJECT",
  CREAT_PROJECT = "CREATE PROJECT",
  GET_PROJECT = "GET PROJECT",
  CREAT_LOAD_PROFILE = "CREATE LOAD PROFILE",
  TOGGLE_MODAL = "TOGGLE MODAL",
  DONE_SHOWING_MODAL = "DONE SHOWING MODAL",
  GET_LOADPROFILE = "GET LOADPROFILE",
}

export interface ProjectListAction {
  type: ActionTypes.LIST_PROJECT
  payload: ProjectListState
}

export interface ProjectCreateAction {
  type: ActionTypes.CREAT_PROJECT
  payload: {
    project: {
      id: string
      user: number
      load_profile: number
    }
  }
}

export interface LoadProfileCreatAction {
  type: ActionTypes.CREAT_LOAD_PROFILE
  payload: {
    load: ILoad
    loadStatusCode: StatusCode
  }
}

export interface IsDoneWithModalAction {
  type: ActionTypes.CREAT_LOAD_PROFILE
  payload: {
    isDoneShowTable: boolean
    statusCode: StatusCode
  }
}

export interface ToggleModalAction {
  type: ActionTypes.TOGGLE_MODAL
  payload: {
    showModal: boolean
  }
}

export interface GetProjectModal {
  type: ActionTypes.GET_LOADPROFILE
  payload: {
    loadProfile: ILoadProfile
  }
}

export type AuthActions =
  | ProjectListAction
  | ProjectCreateAction
  | LoadProfileCreatAction
  | GetProjectModal
  | ToggleModalAction
