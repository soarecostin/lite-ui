import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      fieldTypes: state => state['field-types'].types
    })
  },
  methods: {
    ...mapActions({
      getAllFieldTypes: 'field-types/all'
    }),
    loadFieldTypes () {
      return new Promise((resolve, reject) => {
        if (this.fieldTypes.length > 0) {
          return resolve()
        }
        this.getAllFieldTypes()
          .then(() => {
            resolve()
          }).catch((error) => {
            reject(error)
          })
      })
    }
  }
}
