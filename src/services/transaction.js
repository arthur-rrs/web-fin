import clientHttp from '../services/clientHTTP'

export default {
  'save': async function (data) {
    return clientHttp.post('/transactions', data);
  },
  'allByPeriod': async function (start, end) {
    return clientHttp.get('/transactions/' + start + '/' + end);
  },
  'delete': async function(id) {
    return clientHttp.delete('/transactions/'+id);
  },
  'update': async function (id, data) {
    return clientHttp.put('/transactions/' + id, data);
  },

  'pay': async function(id) {
    const data = {is_pay: true};
    return this.update(id, data);
  },
  getBalance: async function (start, end) {
    return this.allByPeriod(start, end)
    .then((response) => {
      const transactions = response.data;
      const balance = transactions.reduce((previous, current) => {
        if (!current.is_pay) {
          return previous;
        }
        if ('income' == current.type) {
          previous += parseFloat(current.value);
          return previous;
        } else {
          previous -= parseFloat(current.value);
          return previous;
        }
      }, 0);
      return balance;
    });
  }

}