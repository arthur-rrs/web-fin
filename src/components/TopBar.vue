<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">WebFin</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/transactions">Transações</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/accounts">Contas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/report">Relátorio</a>
            </li>
          </ul>
        </div>
        <span class="navbar-text">Organize sua vida financeira!</span>
        <a @click="logout()">Sair</a>
      </div>
    </nav>
  </div>
</template>
<script>
import auth from '../services/auth'

export default {
  methods: {
    logout: function () {
      auth.logout();
      this.$router.push({ "name": "Login" })
    }
  }
}
</script>