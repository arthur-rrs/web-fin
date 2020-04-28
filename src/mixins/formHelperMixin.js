export default {
  data() {
    return {
      haserrors: {},
      messageErrors: {}
    }
  },
  methods: {
    processError: function (error) {
      const status = error.response.status;
      if (422 == status) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          this.haserrors[key] = true;
          this.messageErrors[key] = errors[key].toString();
        }
      }
      if (403 == status) {
        this.haserrors['auth'] = true;
        this.haserrors['auth'] = 'email ou senha estão incorretos!';
      }
    },
    clearErrors: function () {
      for (const key in this.haserrors) {
        this.haserrors[key] = false;
      }
      for (const key in this.messageErrors) {
        this.messageErrors[key] = '';
      }
    }
  }
}