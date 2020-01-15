<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="m-0 p-0">
        Total Fields
      </h5>
      <b-button size="sm" to="/fields">
        View All
      </b-button>
    </div>
    <h1>{{ totalFields }}</h1>
    <pulse-loader :loading="loading" v-show="loading" />
  </b-card>
</template>

<script>
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  mixins: [
    showsLoadingState
  ],
  data () {
    return {
      totalFields: 0
    }
  },
  created () {
    this.startLoading()
    this.$repositories.fields.index().then(({ meta }) => {
      this.stopLoading()
      this.totalFields = meta.total
    })
  }
}
</script>
