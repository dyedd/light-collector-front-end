import axios from "axios"
import {
  getStorage,
  removeStorage
} from "./storage"
import {
  message
} from 'ant-design-vue';

const http = axios.create({
  timeout: 1000
})

http.interceptors.request.use(
  (config) => {
    // get access token
    // console.log(config,233);
    getStorage({
      key: "token",
      success: (token) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        } else {
          delete config.headers.Authorization
        }
      },
    })
    return config
  },
  // request error
  (error) => {
    console.log('出错了', error)
    return Promise.reject(error)
  }
)

http.interceptors.response.use((res) => {
  // if(res.data.code == 403){
  //   message.error('登录过期')
  //   // removeALLStorage({key:'token'})
  // }
  return res
}, error => {
  message.error(error.message)
  return Promise.reject(error)
})
export default http