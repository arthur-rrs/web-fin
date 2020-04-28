<template>
  <div>
    <top-bar></top-bar>
    <div class="container">
      <div class="row mt-3">
        <div class="col-12">
          <div class="card-group">
            
            <div class="card text-center" v-for="account of accounts" :key="account.id">
              <div class="card-body">
                <h5 class="card-title">{{account.name}}</h5>
                <button @click="trash(account.id)" class="btn btn-danger">Excluir</button>
                 <p class="card-text"><small class="text-muted">Essa operação excluirá o historico da conta.</small></p>
              </div>
            </div>

            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">Nova Conta</h5>
                <form @submit.prevent="save()">
                  <input type="text" class="form-control" 
                  :disabled="dis" v-model="name">
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import accountService from '../services/accounts'

export default {
  data() {
    return {
      accounts: [],
      name: '',
      dis: false
    }
  },
  created() {
    this.updateCards();
  },
  components: {
    TopBar
  },
  methods: {
    save: function () {
      this.dis = true;
      accountService.save({name: this.name})
        .then(this.updateCards).finally(() => {
          this.dis = false;
          this.name = '';
        });
    },
    trash: function (id) {
      accountService.remove(id).then(this.updateCards);
    },
    updateCards: function() {
      accountService
        .myaccounts()
        .then( (response) => {
          this.accounts = response.data;
        });
    }
  }
};
</script>

<style>
</style>