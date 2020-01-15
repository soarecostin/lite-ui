<template>
  <div>
    <title-bar title="Edit field" back-url="/fields">
      <subscribers-submenu />
    </title-bar>
    <div class="container mb-5">
      <div>
        <h4 class="mb-3">
          Field details
        </h4>

        <b-card border-variant="light" class="mb-4">
          <b-form>
            <vue-form-generator
              :schema="schema"
              :model="model"
              :options="formOptions"
            ></vue-form-generator>
          </b-form>
          <pulse-loader :loading="loading" v-show="loading" />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubscribersSubmenu from '~/components/submenus/SubscribersSubmenu'
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  middleware: ['auth'],
  components: {
    SubscribersSubmenu
  },
  mixins: [
    showsLoadingState
  ],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      model: {
        title: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'title',
            placeholder: 'Enter field name',
            required: true,
            validator: ['string', 'required']
          },
          {
            type: 'submit',
            buttonText: 'Edit field',
            fieldClasses: 'btn btn-primary',
            styleClasses: 'mt-4',
            disabled: () => this.loading,
            validateBeforeSubmit: true,
            onSubmit: this.onSubmit
          }
        ]
      },
      formOptions: {
        validateAfterChanged: true,
        validateDebounceTime: 500
      }
    }
  },
  computed: {
    fieldId () {
      return this.$route.params.id
    }
  },
  created () {
    this.startLoading()
    this.$repositories.fields.show(this.fieldId).then(({ data }) => {
      this.stopLoading()
      this.model.title = data.title
    }).catch(() => {
      this.$toast.error('The requested field cannot be loaded').goAway(5000)
      this.$router.push('/fields')
    })
  },
  methods: {
    ...mapActions({
      resetFields: 'fields/reset'
    }),
    onSubmit () {
      this.startLoading()
      this.$repositories.fields
        .update(this.fieldId, this.model).then(() => {
          this.resetFields()
          this.$toast.success('The field was updated!').goAway(5000)
          this.$router.push('/fields')
        })
        .catch(error => this.$toast.error(error).goAway(5000))
        .finally(() => this.stopLoading())
    }
  }
}
</script>
