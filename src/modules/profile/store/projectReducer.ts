import { combineReducers } from "redux"

import { StatusCode } from "../../../shared/helpers"
import { ProjectListState } from "../models"
import { ActionTypes, AuthActions } from "./actionTypes"

const projectInitialState: ProjectListState = {
  projects: [],
  statusCode: StatusCode.INITIAL,
  loadStatusCode: StatusCode.INITIAL,
  project: null,
  load: null,
  loads: [],
  isDoneShowTable: false,
  showModal: false,
  loadProfile: null,
}

const productListReducer = (
  state: ProjectListState = projectInitialState,
  action: AuthActions
) => {
  switch (action.type) {
    case ActionTypes.LIST_PROJECT: {
      const { projects, statusCode } = action.payload

      return { ...state, projects, statusCode }
    }
    case ActionTypes.CREAT_PROJECT: {
      const { project } = action.payload

      return { ...state, project }
    }
    case ActionTypes.CREAT_LOAD_PROFILE: {
      const { load, loadStatusCode } = action.payload

      return {
        ...state,
        load,
        loadStatusCode,
        isDoneShowTable: true,
      }
    }
    case ActionTypes.TOGGLE_MODAL: {
      const { showModal } = action.payload

      return { ...state, showModal }
    }
    case ActionTypes.GET_LOADPROFILE: {
      const { loadProfile } = action.payload

      return { ...state, loadProfile }
    }
    default:
      return state
  }
}

const productReducer = combineReducers({
  listing: productListReducer,
})

export default productReducer
