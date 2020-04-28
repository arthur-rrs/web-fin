import clientHttp from '../services/clientHTTP'

export default {
  'all': async function () {
    return clientHttp.get('/categories');
  }
}