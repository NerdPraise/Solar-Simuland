import { combineReducers } from "redux"
import { AuthState } from "../modules/auth/models"
import authReducer from "../modules/auth/store/authReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
})

export interface AppState {
  auth: AuthState
}
