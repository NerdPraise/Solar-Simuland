import { Dispatch } from 'redux'

import { API } from '../../../core/api'
import { AppState } from '../../../redux/rootReducers'
import { StatusCode } from '../../../shared/helpers'
import { ActionTypes } from './actionTypes'


export const getProjects = () => (dispatch: Dispatch, getState: () => AppState) => {
  API.get("projects/")
    .then((response) => {

      dispatch({
        type: ActionTypes.LIST_PROJECT,
        payload: {
          projects: response.data,
          statusCode: response.status,
        },
      })
    })
    .catch((err) => {
      const { projects } = getState().project.listing
      dispatch({
        type: ActionTypes.LIST_PROJECT,
        payload: {
          projects,
          statusCode: err.response
            ? err.response.status
            : StatusCode.BAD_REQUEST,
        },
      })
    })
}

export const createProject = () => (dispatch: Dispatch, getState: () => AppState) => {
  API.post(`projects/`)
    .then((response) => {

      dispatch({
        type: ActionTypes.CREAT_PROJECT,
        payload: {
          project: response.data,
          statusCode: response.status,
        },
      })
    })
    .catch((err) => {
      const { projects } = getState().project.listing
      dispatch({
        type: ActionTypes.CREAT_PROJECT,
        payload: {
          projects,
          statusCode: err.response
            ? err.response.status
            : StatusCode.BAD_REQUEST,
        },
      })
    })
}

export const createLoadProfile = (value: any, id?: number) => (dispatch: Dispatch, getState: () => AppState) => {
  API.post(`loads/${id}`, value)
    .then((response) => {

      dispatch({
        type: ActionTypes.CREAT_LOAD_PROFILE,
        payload: {
          load: response.data,
          statusCode: response.status,
        },
      })
    })
    .catch((err) => {
      const { load } = getState().project.listing
      console.log(err.response)
      dispatch({
        type: ActionTypes.CREAT_LOAD_PROFILE,
        payload: {
          load,
          statusCode: err.response
            ? err.response.status
            : StatusCode.BAD_REQUEST,
        },
      })
    })
}