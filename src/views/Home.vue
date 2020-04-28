<template>
  <div>
    <top-bar></top-bar>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4 col-12">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title text-center">Acesso Rapido</h5>
                  <div class="d-flex justify-content-center">
                    <router-link
                      :to="{name: 'AddTransaction', params: {type: 'expense'}}"
                      class="float-left btn btn-outline-danger mr-2"
                    >Nova Despesa</router-link>
                    <router-link
                      :to="{name: 'AddTransaction', params: {type: 'income'}}"
                      class="float-left btn btn-outline-success"
                    >Nova Receita</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <p class="card-title h5 text-center">Saldo</p>
                  <p class="h4 text-center">{{balance}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <p class="card-title h5 text-center">Minhas Contas</p>
                  <ul class="list-group list-group-flush">
                    <li
                      v-for="account of accounts"
                      :key="account.id"
                      class="list-group-item"
                    >{{account.name}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <p class="h5">Contas a Pagar</p>
              <hr />
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="expense of expensesOpen" :key="expense.id">
                  {{expense.date_at }} {{expense.name}}  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import TopBar from "../components/TopBar";
import accountsService from "../services/accounts";
import transactionsService from "../services/transaction";

export default {
  components: {
    TopBar
  },
  created() {
    accountsService.myaccounts().then(response => {
      const data = response.data;
      this.accounts = data;
    });
    const start = moment('19700101').format(moment.HTML5_FMT.DATE);
    const end = moment()
      .add(20, 'years')
      .format(moment.HTML5_FMT.DATE);
    transactionsService.getBalance(start, end).then(balance => {
      this.balance = 
        new Intl.
        NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(balance);
    });
    const now = moment().format(moment.HTML5_FMT.DATE);
    const after15days = moment().add(15, "days").format(moment.HTML5_FMT.DATE);
    transactionsService
    .allByPeriod(now, after15days)
    .then((response) => {
      const transactions = response.data;
      this.expensesOpen = transactions.filter((current) => {
        return !current.is_pay && current.type == 'expense';
      }).map((current) => {
        const newDate = moment(current.date_at).format('DD/MM/YYYY');
        current['date_at'] = newDate;
        return current;
      });
      
    })
  },
  data() {
    return {
      accounts: [],
      balance: 'aguarde',
      expensesOpen: []
    };
  }
};
</script>
