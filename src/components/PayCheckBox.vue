<template>
  <div>
    <button
      class="btn"
      @click="emitClick"
      :class="{'btn-outline-danger': !isPay, 'btn-outline-success': isPay}"
    >
      <span v-if="!isPay">Pagar</span>
      <span v-else>Pago</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isPay: Number,
    id: Number
  },
  methods: {
    emitClick: function() {
      this.$emit("click-pay", this.id);
    }
  }
};
</script>