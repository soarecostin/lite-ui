<template>
  <div>
    <title-bar title="Dashboard" class="pb-4">
      <template slot="button">
        &nbsp;
      </template>
    </title-bar>
    <div class="container">
      <b-row class="mb-4">
        <b-col>
          <subscribers-total-card></subscribers-total-card>
        </b-col>
        <b-col>
          <fields-total-card></fields-total-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import SubscribersTotalCard from '~/components/SubscribersTotalCard'
import FieldsTotalCard from '~/components/FieldsTotalCard'

export default {
  middleware: ['auth'],
  components: {
    SubscribersTotalCard,
    FieldsTotalCard
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
