<script>
import { Doughnut, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  mixins: [reactiveProp],
  props: {
    options: Object
  }
}
</script>

<style>

</style>