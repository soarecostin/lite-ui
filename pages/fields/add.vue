<template>
  <div>
    <title-bar title="Add new field" back-url="/fields">
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
import loadsFieldTypes from '~/mixins/loadsFieldTypes'
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  middleware: ['auth'],
  components: {
    SubscribersSubmenu
  },
  mixins: [
    loadsFieldTypes,
    showsLoadingState
  ],
  data () {
    return {
      model: {
        title: '',
        type: null
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
            type: 'select',
            values: () => {
              return this.fieldTypes.map((fieldType) => {
                return {
                  'id': fieldType,
                  'name': fieldType
                }
              })
            },
            label: 'Type',
            model: 'type',
            required: true,
            validator: ['required']
          },
          {
            type: 'submit',
            buttonText: 'Add field',
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
  created () {
    this.startLoading()
    this.loadFieldTypes().then(() => this.stopLoading())
  },
  methods: {
    ...mapActions({
      resetFields: 'fields/reset'
    }),
    onSubmit () {
      this.startLoading()
      this.$repositories.fields
        .create(this.model).then(() => {
          this.resetFields()
          this.$toast.success('The field was created!').goAway(5000)
          this.$router.push('/fields')
        })
        .catch(error => this.$toast.error(error).goAway(5000))
        .finally(() => this.stopLoading())
    }
  }
}
</script>
