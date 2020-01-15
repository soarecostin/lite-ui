<template>
  <div>
    <div class="row vh-80">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto d-flex align-items-center">
        <b-card class="card-signin my-4 flex-grow-1">
          <h5 class="card-title text-center">
            Sign In
          </h5>
          <b-form class="form-signin">
            <vue-form-generator
              :schema="schema"
              :model="model"
              :options="formOptions"
              @validated="onValidated"
            ></vue-form-generator>
            <b-alert :show="apiError != null" variant="danger">
              {{ apiError }}
            </b-alert>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  mixins: [
    showsLoadingState
  ],
  data () {
    return {
      apiError: null,
      validated: false,
      model: {
        email: '',
        password: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'email',
            label: 'Email address',
            model: 'email',
            required: true,
            validator: ['email', 'required']
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            model: 'password',
            required: true,
            min: 5,
            validator: ['string', 'required']
          },
          {
            type: 'submit',
            buttonText: 'Sign in',
            fieldClasses: 'btn btn-primary btn-lg btn-block text-uppercase',
            styleClasses: 'mt-4',
            disabled: () => this.loading,
            validateBeforeSubmit: true,
            onSubmit: this.login
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
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    onValidated (isValid, errors) {
      this.apiError = null
    },
    login () {
      this.startLoading()
      this.$auth.loginWith('local', {
        data: this.model
      }).then(() => {
        this.$toast.success('You are now logged in...').goAway(5000)
      }).catch(() => {
        this.apiError = 'Invalid credentials'
      }).finally(() => {
        this.stopLoading()
      })
    }
  }
}
</script>

<style>
.card-signin {
  border: 0;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}
</style>
