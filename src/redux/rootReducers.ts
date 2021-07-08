import { combineReducers } from "redux"
import authReducer from "../modules/auth/store/authReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
})

export interface AppState {
  auth: ""
}
