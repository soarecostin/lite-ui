<template>
  <b-card border-variant="light" class="mb-4">
    <b-row>
      <b-col sm="12" lg="6" class="py-2">
        <label class="font-weight-bold">Email:</label>
        <span>{{ subscriber.email }}</span>
      </b-col>
      <b-col sm="12" lg="6" class="py-2">
        <label class="font-weight-bold">Name:</label>
        <span>{{ subscriber.name }}</span>
      </b-col>
      <b-col v-for="field in subscriber.fields" :key="field.id" sm="12" lg="6" class="py-2">
        <label class="font-weight-bold">{{ getFieldTitle(field.key) }}:</label>
        <span>{{ field.value }}</span>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    subscriber: {
      type: Object,
      default () {
        return {}
      }
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getFieldByKey (fieldKey) {
      return this.fields.find(field => field.key === fieldKey)
    },
    getFieldTitle (fieldKey) {
      const field = this.getFieldByKey(fieldKey)
      return field ? field.title : ''
    }
  }
}
</script>

<style>

</style>
