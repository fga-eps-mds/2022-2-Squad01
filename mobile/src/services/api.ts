import axios from "axios";
import { LOCALHOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const port = "3333";

if (!LOCALHOST) {
  console.log("Lembre-se de colocar o IP gerado pelo expo no .env com o nome LOCALHOST=seuip");
}

export const api = axios.create({
  baseURL: `http://192.168.1.105:3333`,
});

api.interceptors.request.use(async (req) => {
  const user = await AsyncStorage.getItem("@vambora:user")

  if (user) {
    const { token } = JSON.parse(user)

    req.headers = {
      Authorization: `Bearer ${token}`
    }
  }

  return req
})

api.interceptors.response.use((res) => {
  return res
}, async (error) => {
  const originalRequest = error.config

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    await refreshUserToken(error)

    return api(originalRequest)
  }

  return Promise.reject(error)
})

async function refreshUserToken(error) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("@vambora:user"))

      const response = await api.post("/user/refresh-token", {
        refresh_token: user.refreshToken
      })

      const newUser = {
        ...user,
        refreshToken: response.data.refreshToken.id,
        token: response.data.token
      }

      await AsyncStorage.setItem("@vambora:user", JSON.stringify(newUser))

      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}
