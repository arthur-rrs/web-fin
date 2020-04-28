<template>
  <div>
    <top-bar></top-bar>
    <div class="container">
      <div class="row">
        <div class="card-form rounded col-12 col-md-6 offset-md-3 mt-3 p-3">
          <p class="h5">Nova {{typeStr}}</p>
          <form @submit.prevent="save()">
            <div class="row">
              <div class="form-group col-9">
                <label for="name">Descrição:</label>
                <input
                  :class="{'is-invalid': haserrors['name']}"
                  name="name"
                  type="text"
                  id="name"
                  class="form-control form-control-sm"
                  v-model="transaction.name"
                />
                <div class="invalid-feedback" v-if="haserrors['name']">{{messageErrors['name']}}</div>
              </div>
              <div class="col-3 form-group">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="inlineCheckbox1"
                    value="1"
                    v-model="transaction.is_pay"
                  />
                  <label class="form-check-label" for="inlineCheckbox1">Pago</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="inlineCheckbox2"
                    value="0"
                    v-model="transaction.is_pay"
                  />
                  <label class="form-check-label" for="inlineCheckbox2">Não pago</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col">
                <label for="date_at">Data:</label>
                <input
                  :class="{'is-invalid': haserrors['date_at']}"
                  name="date_at"
                  type="date"
                  id="date_at"
                  class="form-control form-control-sm"
                  v-model="transaction.date_at"
                />
                <div
                  class="invalid-feedback"
                  v-if="haserrors['date_at']"
                >{{messageErrors['date_at']}}</div>
              </div>
              <div class="form-group col">
                <label for="value">Valor:</label>
                <money
                  :class="{'is-invalid': haserrors['value']}"
                  name="value"
                  id="value"
                  class="form-control form-control-sm"
                  v-model="transaction.value"
                ></money>
                <div class="invalid-feedback" v-if="haserrors['value']">{{messageErrors['value']}}</div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col">
                <label for="category-list">Categoria</label>
                <select
                  :class="{'is-invalid': haserrors['category_id']}"
                  name="category"
                  id="category-list"
                  class="form-control form-control-sm"
                  v-model="transaction.category_id"
                >
                  <option
                    :value="category.id"
                    v-for="category of categories"
                    :key="category.id"
                  >{{category.name}}</option>
                </select>
                <div
                  class="invalid-feedback"
                  v-if="haserrors['category_id']"
                >{{messageErrors['category_id']}}</div>
              </div>
              <div class="form-group col">
                <label for="account-list">Conta:</label>
                <select
                  :class="{'is-invalid': haserrors['account_id']}"
                  name="account"
                  id="account-list"
                  class="form-control form-control-sm"
                  v-model="transaction.account_id"
                >
                  <option
                    :value="account.id"
                    v-for="account of accounts"
                    :key="account.id"
                  >{{account.name}}</option>
                </select>
                <div
                  class="invalid-feedback"
                  v-if="haserrors['account_id']"
                >{{messageErrors['account_id']}}</div>
              </div>
            </div>
            <div class="form-group">
              <label for="note">Observação</label>
              <textarea
                :class="{'is-invalid': haserrors['note']}"
                name="note"
                id="note"
                rows="3"
                class="form-control form-control-sm"
                v-model="transaction.note"
              ></textarea>
              <div class="invalid-feedback" v-if="haserrors['note']">{{messageErrors['note']}}</div>
            </div>
            <button :disabled="btnDisable" class="btn btn-primary">{{btnMessage}}</button>
          </form>
          <div class="alert alert-success mt-2" v-if="hasSave">
            <p>A Transação foi salva com sucesso.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formHelpMixin from "../mixins/formHelperMixin";
import transactionService from "../services/transaction";
import accountService from "../services/accounts";
import categoryService from "../services/category";
import TopBar from "../components/TopBar";
import { Money } from "v-money";

export default {
  components: { Money, TopBar },
  created() {
    accountService.myaccounts().then(response => {
      const data = response.data;
      this.accounts = data;
    });
    categoryService.all().then(response => {
      const data = response.data;
      this.categories = data;
    });
  },
  data() {
    return {
      accounts: [],
      categories: [],
      transaction: {
        is_pay: 1
      },
      hasSave: false,
      btnDisable: false,
      btnMessage: "Salvar"
    };
  },
  mixins: [formHelpMixin],
  props: {
    type: { String, default: "expense" }
  },
  methods: {
    save: function() {
      this.btnMessage = "Aguarde";
      this.btnDisable = true;
      this.hasSave = false;
      this.clearErrors();
      this.transaction.type = this.type;
      transactionService
        .save(this.transaction)
        .then(() => {
          this.hasSave = true;
          this.transaction = {};
        })
        .catch(this.processError)
        .finally(() => {
          this.btnDisable = false;
          this.btnMessage = "Salvar";
        });
    }
  },
  computed: {
    typeStr: function() {
      if (this.type == "income") {
        return "Receita";
      } else {
        return "Despesa";
      }
    }
  }
};
</script>

<style scoped>
.card-form {
  background-color: #fff;
}
</style>