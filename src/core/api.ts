import Axios from "axios"

const baseURL = process.env.REACT_APP_BASE_URL

export const AuthenticatedAPI = Axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 30000,
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
