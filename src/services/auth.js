import axios from 'axios'

const API_URL = process.env.VUE_APP_URL;
const SESSION_ID = 'user-session';

export default {

  'login': async function (credentials) {
    const url = API_URL + '/login'
    return axios
      .post(url, credentials)
      .then(this.sessionInit)
  },
  'sessionInit': function (response) {
    const data = response.data;
    localStorage.setItem(SESSION_ID, 'Bearer ' + data.token);
    return response;
  },
  'logout': function() {
    localStorage.clear();
  }
}