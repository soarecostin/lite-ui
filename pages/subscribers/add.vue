<template>
  <div>
    <title-bar title="Add new subscribers" back-url="/subscribers">
      <subscribers-submenu />
    </title-bar>
    <div class="container mb-5">
      <div>
        <h4 class="mb-3">
          Subscriber details
        </h4>

        <subscriber-form
          :loading="loading"
          :model="model"
          v-on:submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubscribersSubmenu from '~/components/submenus/SubscribersSubmenu'
import SubscriberForm from '~/components/subscribers/SubscriberForm'
import loadsFields from '~/mixins/loadsFields'
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  middleware: ['auth'],
  components: {
    SubscribersSubmenu,
    SubscriberForm
  },
  mixins: [
    loadsFields,
    showsLoadingState
  ],
  data () {
    return {
      model: {
        email: '',
        name: '',
        fields: {}
      }
    }
  },
  created () {
    this.startLoading()
    this.loadFields().then(() => this.stopLoading())
  },
  methods: {
    onSubmit (data) {
      this.startLoading()
      this.$repositories.subscribers.create(this.model).then(() => {
        this.$toast.success('The subscriber was added!').goAway(5000)
        this.$router.push('/subscribers')
      }).catch((error) => {
        this.stopLoading()
        this.$toast.error(error).goAway(5000)
      })
    }
  }
}
</script>
