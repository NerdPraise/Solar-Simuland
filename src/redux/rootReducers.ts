import { combineReducers } from "redux"

import { AuthState } from "../modules/auth/models"
import { IProjectState } from "../modules/profile/models"
import authReducer from "../modules/auth/store/authReducer"
import projectReducer from "../modules/profile/store/projectReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
})

export interface AppState {
  auth: AuthState,
  project:  IProjectState
}
