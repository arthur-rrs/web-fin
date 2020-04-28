<template>
  <div>
    <top-bar></top-bar>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2 card-login mt-2 rounded p-5">
          <carrosel-calendar v-on:change-period="updateTable"></carrosel-calendar>
          <hr />
          <div class="d-flex justify-content-left m-2">
            <router-link
              :to="{name: 'AddTransaction', params: {type: 'expense'}}"
              class="float-left btn btn-outline-danger mr-2"
            >Nova Despesa</router-link>
            <router-link
              :to="{name: 'AddTransaction', params: {type: 'income'}}"
              class="float-left btn btn-outline-success"
            >Nova Receita</router-link>
          </div>
          <transaction-list
            v-on:change-data="updateTable"
            :balance="balance"
            :transactions="transactions"
          ></transaction-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import transactionService from "../services/transaction";
import TopBar from "../components/TopBar";
import CarroselCalendar from "../components/CarroselCalendar";
import TransactionList from "../components/TransactionsList";
import moment from 'moment';

export default {
  components: {
    TopBar,
    CarroselCalendar,
    TransactionList
  },
  data() {
    return {
      transactions: [],
      start: "",
      end: "",
      balance: 0
    };
  },
  methods: {
    updateTable: function(start, end) {
      if (start) {
        this.start = start;
        this.end = end;
      }
      transactionService.allByPeriod(this.start, this.end).then(response => {
        const data = response.data;
        this.transactions = data;
      });
      const s = moment("19700101").format(moment.HTML5_FMT.DATE);
      const e = moment()
        .add(20, "years")
        .format(moment.HTML5_FMT.DATE);
      transactionService.getBalance(s, e).then(balance => {
        this.balance = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(balance);
      });
    }
  }
};
</script>

<style>
.card-login {
  background-color: #fff;
}
</style>