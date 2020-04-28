import axios from 'axios'

const SESSION_ID = 'user-session';
const API_URL = process.env.VUE_APP_URL;

const config = {
  headers: {
    'Authorization': localStorage.getItem(SESSION_ID)
  },
  baseURL: API_URL
};
export default axios.create(config)