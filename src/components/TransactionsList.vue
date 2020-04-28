<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Dia</th>
          <th>Categoria</th>
          <th>Conta</th>
          <th>Nome</th>
          <th>Valor</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction of transactions" :key="transaction.id" 
          :class="{'text-success': transaction.type == 'income', 'text-danger': transaction.type != 'income'}">
          <td>{{dateFormatter(transaction.date_at)}}</td>
          <td>{{transaction.category_name}}</td>
          <td>{{transaction.account_name}}</td>
          <td>{{transaction.name}}</td>
          <td>{{transaction.value}}</td>
          <td><pay-check-box :id='transaction.id' v-on:click-pay="pay" :is-pay="transaction.is_pay"></pay-check-box></td>
          <td><button class="btn btn-outline-danger" @click="trash(transaction.id)">&#128465;</button></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td scope="col">Total</td>
          <td scope="col">{{balance}}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>  
  </div>
</template>

<script>
import moment from 'moment'
import PayCheckBox from '../components/PayCheckBox'
import transactionService from '../services/transaction'

export default {
  components: {
    PayCheckBox
  },
  props: {
    transactions: Array,
    balance: String
  },
  methods: {
    dateFormatter: function (value) {
      return moment(value, moment.HTML5_FMT.DATE).format('DD');
    },
    pay: function(id) {
      transactionService
        .pay(id)
        .then(() => {
          this.$emit('change-data')
        })
    },
    trash: function(id) {
      transactionService
        .delete(id)
        .then(() => {
          this.$emit('change-data')
        })
    }
  }
}
</script>