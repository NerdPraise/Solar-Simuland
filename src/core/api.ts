import Axios from "axios"

const baseURL = "http://thawing-tor-16209.herokuapp.com/api/"

const AuthenticatedAPI = Axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 18000,
})

AuthenticatedAPI.interceptors.request.use((apiConfig) => {
  const token = localStorage.getItem("ACCESS_TOKEN_KEY")
  const newConfig = {
    ...apiConfig,
    headers: {
      ...apiConfig.headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  }

  return newConfig
})

export const API = AuthenticatedAPI
