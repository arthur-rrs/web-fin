import axios from 'axios'
const API_URL = process.env.VUE_APP_URL;

export default {
  'signin': async function(data) {
    return axios.post(API_URL + '/user', data);
  }
}