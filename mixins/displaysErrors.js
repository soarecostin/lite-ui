export default {
  methods: {
    displayErrors ({ status, data }) {
      if (status === 422) {
        this.displayValidationErrors(data)
      }
    },
    displayValidationErrors (data) {
      if (!data.errors) {
        this.$toast.error(data.message || 'The given data was invalid.').goAway(5000)
      }
      Object.values(data.errors).forEach((errorArray) => {
        errorArray.forEach(errorMessage => this.$toast.error(errorMessage).goAway(5000))
      })
    }
  }
}
