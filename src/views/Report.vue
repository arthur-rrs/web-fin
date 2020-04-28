<template>
  <div>
    <top-bar></top-bar>
    <div class="container">
      <div class="row mt-3">
        <div class="col-md-8 offset-md-2 col-12">
          <div class="box p-3 rounded">
            <carrosel-calendar v-on:change-period="update"></carrosel-calendar>
            <p class="h5 mt-2">Despesas por Categoria</p>
            <div class="form-group form-check">
              <input @change="update()" type="checkbox" class="form-check-input" id="exampleCheck1" v-model="hasPay"/>
              <label class="form-check-label" for="exampleCheck1">Considerar transações não pagas.</label>
            </div>
            <div class="chart-container" v-if="!hasLoaded">
              <group-chart :chartData="dataset" :options="options"></group-chart>
            </div>
            <p class="h5 text-center" v-if="hasLoaded">Carregando.. Aguarde!</p>
            <p class="h5 text-center" v-if="isEmpty">Sem transações nesse periodo.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import transactionService from "../services/transaction";
import CarroselCalendar from "../components/CarroselCalendar";
import TopBar from "../components/TopBar";
import GroupChart from "../components/GroupChart";

export default {
  components: {
    CarroselCalendar,
    TopBar,
    GroupChart
  },
  data() {
    return {
      isEmpty: false,
      hasLoaded: true,
      dataset: {},
      options: { responsive: true },
      categories: {},
      hasPay: 0,
      start: '',
      end: ''
    };
  },
  methods: {
    update: function(start, end) {
      this.isEmpty = false;
      this.hasLoaded = true;
      if (start) {
        this.start = start;
        this.end= end;
      }
      transactionService
        .allByPeriod(this.start, this.end)
        .then(response => {
          return response.data;
        })
        .then(transactions => {
          this.categories = transactions.reduce(this.reduceCategories, {});
          let cat = {};
          for (let key in this.categories) {
            const accounts = this.categories[key];
            let amount = 0;
            for (let i = 0; i < accounts.length; i++) {
              amount += 1 * accounts[i].value;
            }
            cat[key] = amount;
          }
          let back = Object.values(cat).map(() => {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
          });
          if (0 == Object.values(cat).length) {
            this.isEmpty = true;
          }
          this.hasLoaded = false;
          this.dataset = {
            labels: Object.keys(cat),
            datasets: [
              {
                data: Object.values(cat),
                backgroundColor: back
              }
            ]
          };
          
        });
    },
    reduceCategories: function (previous, current) {
      const key = current.category_name;
      if (current.type == "income" || current.is_pay == this.hasPay) return previous;
      if (undefined == previous[key]) previous[key] = [current];
      else previous[key].push(current);
      return previous;
    },
    updateGraph: function() {
      const data = {
        datasets: {}
      };
      this.data = data;
    }
  }
};
</script>

<style>
.box {
  background-color: #fff !important;
  height: 450px;
}
.chart-container {
  background-color: #fff !important;
  margin: auto;
  height: 20vh;
  width: 20vw;
}
</style>