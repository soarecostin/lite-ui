<template>
  <div>
    <title-bar title="New personal access token" back-url="/tokens" class="pb-4">
    </title-bar>
    <div class="container mb-5">
      <div>
        <h4 class="mb-3">
          Token details
        </h4>

        <b-card border-variant="light" class="mb-4">
          <div v-if="token">
            <b-alert show variant="info">
              Make sure to copy your new personal access token now. You won't be able to see it again!
            </b-alert>
            <b-alert show variant="success">
              Your token is: <strong>{{ token }}</strong>
            </b-alert>
            <b-button variant="secondary" to="/tokens">
              Back
            </b-button>
          </div>

          <b-form v-if="!token">
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
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  middleware: ['auth'],
  mixins: [
    showsLoadingState
  ],
  data () {
    return {
      token: null,
      model: {
        note: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Note',
            placeholder: 'What\'s this token for?',
            model: 'note',
            required: true,
            validator: ['required']
          },
          {
            type: 'submit',
            buttonText: 'Add token',
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
  methods: {
    onSubmit () {
      this.startLoading()
      this.$repositories.tokens.create(this.model).then(({ token }) => {
        this.stopLoading()
        this.token = token
        this.$toast.success('The token was created!').goAway(5000)
      }).catch((error) => {
        this.stopLoading()
        this.$toast.error(error).goAway(5000)
      })
    }
  }
}
</script>
