<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 card-login mt-2 rounded p-5">
        <h2 class="pb-4">WebFin - Finanças Pessoais</h2>
        <h2 class="text-center">Entre na sua conta</h2>
        <form @submit.prevent="login()">
          <div class="form-group">
            <label for="email">email</label>
            <input name="email" type="email" id="email" class="form-control" 
              v-model="credentials.email" 
              :class="{'is-invalid': haserrors['email']}">
            <div class="invalid-feedback" v-if="haserrors['email']">
              {{messageErrors['email']}}
            </div>
          </div>
          <div class="form-group">
            <label for="password">senha</label>
            <input name="password" type="password" id="password" class="form-control" 
              v-model="credentials.password" 
              :class="{'is-invalid': haserrors['password']}">
            <div class="invalid-feedback" v-if="haserrors['password']">
              {{messageErrors['password']}}
            </div>
          </div>
          <button :disabled="btnDisable" class="btn btn-primary btn-block">{{btnMessage}}</button>
        </form>
        <div v-if="haserrors['auth']" class="alert alert-danger mt-3">
          email ou senha estão incorretos!
        </div>
        <hr/>
        <p class="h5 text-center">ou cadastre-se clicando <router-link to="/signin">aqui</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../services/auth'
import formHelperMixin from '../mixins/formHelperMixin'

export default {
  data() {
    return {
      btnMessage: "Entrar",
      btnDisable: false,
      credentials: {},
      haserrors: {
        email: false,
        password: false,
        auth: false
      },
      messageErrors: {
        email: '',
        password: '',
        auth: ''
      }
    }
  },
  mixins: [formHelperMixin],
  methods: {
    login: function() {
      this.clearErrors();
      this.btnMessage = 'Aguarde...'
      this.btnDisable = true;
      auth
        .login(this.credentials)
        .then(this.processSuccessLogin)
        .catch(this.processError)
        .finally(() => {
          this.btnMessage = 'Entrar'
          this.btnDisable = false;
        })
    },
    processSuccessLogin: function() {
      this.$router.push({"name": "Home"})
    }
  }
}
</script>

<style>
  @import url("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
  
  body {
    background-color: #92B4F4;
  }

  .card-login {
    background-color: #fff;
  }
</style>