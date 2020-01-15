<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="m-0 p-0">
        Total Subscribers
      </h5>
      <b-button size="sm" to="/subscribers">
        View All
      </b-button>
    </div>
    <h1>{{ totalSubscribers }}</h1>
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
      totalSubscribers: 0
    }
  },
  created () {
    this.startLoading()
    this.$repositories.subscribers.index().then(({ meta }) => {
      console.log(meta)
      this.stopLoading()
      this.totalSubscribers = meta.total
    })
  }
}
</script>
