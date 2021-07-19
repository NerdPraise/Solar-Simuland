import { combineReducers } from "redux"

import { StatusCode } from "../../../shared/helpers"
import { ProjectListState } from "../models"
import { ActionTypes, AuthActions } from "./actionTypes"


const projectInitialState: ProjectListState = {
  projects: [],
  statusCode: StatusCode.INITIAL,
  project: null,
  load: null,
  loads: [],
  isDoneShowTable: false
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
     
      console.log(project)

      return { ...state, project }
    }
    case ActionTypes.CREAT_LOAD_PROFILE: {
      const { load } = action.payload
     
      console.log(load)

      return { ...state, load, isDoneShowTable: true }
    }
    
    default:
      return state
  }
}

const productReducer = combineReducers({
  listing: productListReducer,
})

export default productReducer
