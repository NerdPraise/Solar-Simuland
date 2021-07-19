import { StatusCode } from "../../../shared/helpers";
import { ILoad, ProjectListState } from "../models";

export enum ActionTypes {
  LIST_PROJECT = "LIST PROJECT",
  CREAT_PROJECT = "CREATE PROJECT",
  CREAT_LOAD_PROFILE = "CREATE LOAD PROFILE"
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
    load: ILoad,
    statusCode: StatusCode
  }
}


export type AuthActions =
  | ProjectListAction
  | ProjectCreateAction
  | LoadProfileCreatAction
