<template>
  <div>
    <div class="d-flex justify-content-between">
      <button class="btn btn-outline-secondary" @click="previous()">&lt;</button>
      <p class="h5">{{dateCurrent}}</p>
      <button class="btn btn-outline-secondary" @click="next()">&gt;</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  created() {
    moment.locale("pt-br");
    this.month = parseInt(moment().format("M"));
    this.year = parseInt(moment().format("YYYY"));
    this.emitChange();
  },
  data() {
    return {
      month: 0,
      year: 0
    };
  },
  computed: {
    dateCurrent: function() {
      return (
        moment()
          .month(this.month - 1)
          .format("MMMM ") + this.year
      );
    }
  },
  methods: {
    previous: function() {
      if (this.month == 1) {
          this.month = 12;
          this.year -= 1;
      } else this.month -= 1;
      this.emitChange();
    },
    next: function() {
      if (this.month == 12) { 
        this.month = 1;
        this.year += 1;
      }
      else this.month += 1;
      this.emitChange();
    },
    emitChange: function() {
      const inst = moment()
        .year(this.year)
        .month((this.month-1));
      const start = inst.startOf('month').format('YYYY-MM-DD');
      const end = inst.endOf('month').format('YYYY-MM-DD');
      this.$emit('change-period', start, end);
    }
  }
};
</script>

<style>
</style>