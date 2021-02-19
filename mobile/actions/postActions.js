import axios from "axios";
import { url } from "../config/keys";

export const getList = () => dispatch => {
  return axios
    .get(`${url}/api/feed/list`)
    .then(async res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFavorite = () => {
  return axios
    .get(`${url}/api/post/favorites`)
    .then(async res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const searchByKeyword = keyword => dispatch => {
  return axios
    .get(`${url}/api/post/search`, {
      params: keyword
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const likePost = postId => dispatch => {
  axios
    .put(`${url}/api/post/like`, postId)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}