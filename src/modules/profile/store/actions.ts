import { Dispatch } from "redux"

import { API } from "../../../core/api"
import { AppState } from "../../../redux/rootReducers"
import { StatusCode } from "../../../shared/helpers"
import { ActionTypes } from "./actionTypes"

export const getProjects =
  () => (dispatch: Dispatch, getState: () => AppState) => {
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

export const getLoadProfile = (id: string) => (dispatch: Dispatch) => {
  API.get(`loadprofile/${id}/`)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_LOADPROFILE,
        payload: {
          loadProfile: response.data,
          statusCode: response.status,
        },
      })
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_LOADPROFILE,
        payload: {
          statusCode: err.response
            ? err.response.status
            : StatusCode.BAD_REQUEST,
        },
      })
    })
}

export const createProject =
  () => (dispatch: Dispatch, getState: () => AppState) => {
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

export const createLoadProfile =
  (value: any, id?: number) =>
  (dispatch: Dispatch, getState: () => AppState) => {
    API.post(`loads/${id}`, value)
      .then((response) => {
        dispatch({
          type: ActionTypes.CREAT_LOAD_PROFILE,
          payload: {
            load: response.data,
            loadStatusCode: response.status,
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
            loadStatusCode: err.response
              ? err.response.status
              : StatusCode.BAD_REQUEST,
          },
        })
      })
  }
export const toggleModal =
  () => (dispatch: Dispatch, getState: () => AppState) => {
    const showModal = getState().project.listing.showModal
    dispatch({
      type: ActionTypes.TOGGLE_MODAL,
      payload: {
        showModal: !showModal,
      },
    })
  }

export const getSolarModels =
  () => (dispatch: Dispatch, getState: () => AppState) => {
    API.get(`solar_models/`)
      .then((response) => {
        dispatch({
          type: ActionTypes.GET_SOLAR_MODELS,
          payload: {
            models: response.data,
          },
        })
      })
      .catch((err) => {
        const { models } = getState().project.listing
        console.log(err.response)
        dispatch({
          type: ActionTypes.GET_SOLAR_MODELS,
          payload: {
            models,
            loadStatusCode: err.response
              ? err.response.status
              : StatusCode.BAD_REQUEST,
          },
        })
      })
  }

export const setSelected =
  (id: string | number) => (dispatch: Dispatch, getState: () => AppState) => {
    API.get(`solar_models/${id}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.GET_SOLAR_MODEL,
          payload: {
            selectedModel: response.data,
          },
        })
      })
      .catch((err) => {
        const { selectedModel } = getState().project.listing
        console.log(err.response)
        dispatch({
          type: ActionTypes.GET_SOLAR_MODEL,
          payload: {
            selectedModel,
            loadStatusCode: err.response
              ? err.response.status
              : StatusCode.BAD_REQUEST,
          },
        })
      })
  }
