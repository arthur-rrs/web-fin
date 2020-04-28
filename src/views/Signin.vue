<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 card-login mt-2 rounded p-5">
        <h2 class="pb-4">WebFin - Finanças Pessoais</h2>
        <h4 class="text-center">faça o seu cadastro e organize sua vida financeira.</h4>
        <form @submit.prevent="signin()">
          <div class="form-group">
            <label for="name">Seu nome</label>
            <input name="name" type="text" id="name" class="form-control" 
              v-model="user.name" 
              :class="{'is-invalid': haserrors['name']}">
            <div class="invalid-feedback" v-if="haserrors['name']">
              {{messageErrors['name']}}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Seu email</label>
            <input name="email" type="email" id="email" class="form-control" 
              v-model="user.email" 
              :class="{'is-invalid': haserrors['email']}">
            <div class="invalid-feedback" v-if="haserrors['email']">
              {{messageErrors['email']}}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Sua senha</label>
            <input name="password" type="password" id="password" class="form-control" 
              v-model="user.password" 
              :class="{'is-invalid': haserrors['password']}">
            <div class="invalid-feedback" v-if="haserrors['password']">
              {{messageErrors['password']}}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Repita a senha</label>
            <input name="password" type="password" id="password" class="form-control" 
              v-model="confirmPassword" 
              :class="{'is-invalid': haserrors['confirmPassword']}">
            <div class="invalid-feedback" v-if="haserrors['confirmPassword']">
              {{messageErrors['confirmPassword']}}
            </div>
          </div>

          <button :disabled="btnDisable" class="btn btn-primary btn-block">{{btnMessage}}</button>
        </form>
        <hr/>
        <div class="alert alert-success" v-if="hasSave">
          <p>O Usuário foi salvo com sucesso.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from '../services/user'
import formHelperMixin from '../mixins/formHelperMixin'

export default {
  data() {
    return {
      hasSave: false,
      btnMessage: "Criar",
      btnDisable: false,
      confirmPassword: '',
      user: {},
      haserrors: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false
      },
      messageErrors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  mixins: [formHelperMixin],
  methods: {
    signin: function() {
      this.hasSave = false;
      this.clearErrors();
      this.btnMessage = 'Aguarde...'
      this.btnDisable = true;
      user
        .signin(this.user)
        .then(this.processSuccessLogin)
        .catch(this.processError)
        .finally(() => {
          this.btnMessage = 'Entrar'
          this.btnDisable = false;
        })
    },
    processSuccessLogin: function() {
      this.user = {};
      this.hasSave = true;
      this.confirmPassword = '';
    }
  },
  watch: {
    confirmPassword: function(value) {
      if (value !== this.user.password) {
        this.messageErrors['confirmPassword'] = 'As senhas não conferem';
        this.haserrors['confirmPassword'] = true;
      } else {
        this.messageErrors['confirmPassword'] = '';
        this.haserrors['confirmPassword'] = false;
      }
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