import clientHttp from '../services/clientHTTP'

export default {
  'save': async function (data) {
    return clientHttp.post('/accounts', data);
  },
  'myaccounts': async function () {
    return clientHttp.get('/myaccounts');
  },
  'remove': async function (id) {
    return clientHttp.delete('/accounts/' + id);
  } 
}