<template>
  <div>
    <title-bar title="Edit subscriber" back-url="/subscribers">
      <subscribers-submenu />
    </title-bar>
    <div class="container mb-5">
      <div>
        <h4 class="mb-3">
          Subscriber details
        </h4>

        <subscriber-form
          :loading="loading"
          :edit="true"
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
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
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
        name: '',
        fields: {}
      }
    }
  },
  computed: {
    subscriberId () {
      return this.$route.params.id
    }
  },
  created () {
    this.startLoading()
    this.loadFields().then(() => {
      this.loadSubscriber().then(() => this.stopLoading())
    })
  },
  methods: {
    loadSubscriber () {
      return this.$repositories.subscribers.show(this.subscriberId).then(({ data }) => {
        this.$set(this.model, 'name', data.name)
        data.fields.forEach((field) => {
          const fieldValue = field.type === 'NUMBER' ? Number(field.value) : field.value
          this.$set(this.model.fields, field.key, fieldValue)
        })
      }).catch(() => {
        this.$toast.error('The requested subscriber cannot be loaded').goAway(5000)
        this.$router.push('/subscribers')
      })
    },
    onSubmit (data) {
      this.startLoading()
      this.$repositories.subscribers.update(this.subscriberId, this.model).then(() => {
        this.$toast.success('The subscriber was updated!').goAway(5000)
        this.$router.push('/subscribers')
      }).catch((error) => {
        this.stopLoading()
        this.$toast.error(error).goAway(5000)
      })
    }
  }
}
</script>
