import axios from 'axios';
import {url} from '../config/keys'
export const getMe = () => {
  return axios
    .get(`${url}/api/user/me`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}