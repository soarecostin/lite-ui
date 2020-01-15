import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      fields: state => state.fields.list
    })
  },
  methods: {
    ...mapActions({
      getFields: 'fields/all'
    }),
    loadFields () {
      return new Promise((resolve, reject) => {
        if (this.fields.length > 0) {
          return resolve()
        }
        this.getFields()
          .then(() => {
            resolve()
          }).catch((error) => {
            reject(error)
          })
      })
    }
  }
}
