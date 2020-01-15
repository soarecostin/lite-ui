<template>
  <div class="position-relative">
    <title-bar class="pb-4">
      <template slot="title">
        <div class="d-flex flex-row align-items-center">
          <div class="profile-picture mr-4">
            <b-img :src="avatarUrl" rounded="circle"></b-img>
          </div>
          <div class="profile-title flex-grow-1">
            <h1 class="mb-0">
              {{ subscriber.email }}
            </h1>
            <p
              :class="{'text-success': isActive, 'text-danger': isUnsubscribed, 'text-secondary': isUnconfirmed}"
              class="text-uppercase font-weight-bold"
            >
              {{ subscriber.state }}
            </p>
          </div>
        </div>
      </template>
      <template slot="button">
        <b-button v-if="isActive" @click="unsubscribe" variant="danger" class="mr-2">
          Unsubscribe
        </b-button>
        <b-button v-if="isUnsubscribed" @click="subscribe" variant="success" class="mr-2">
          Subscribe
        </b-button>
        <b-button to="/subscribers" variant="secondary">
          Back
        </b-button>
      </template>
    </title-bar>
    <div class="container mb-5">
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="m-0 p-0">
            Subscriber details
          </h4>
          <div class="text-right">
            <b-button :to="editUrl" variant="secondary">
              Edit
            </b-button>
          </div>
        </div>

        <subscriber-fields-card :fields="fields" :subscriber="subscriber" />
      </div>
    </div>
    <pulse-loader :loading="loading" v-show="loading" />
  </div>
</template>

<script>
import SubscriberFieldsCard from '~/components/subscribers/SubscriberFieldsCard'
import loadFields from '~/mixins/loadsFields'
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  middleware: ['auth'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  components: {
    SubscriberFieldsCard
  },
  mixins: [
    loadFields,
    showsLoadingState
  ],
  data () {
    return {
      subscriberId: this.$route.params.id,
      subscriber: {}
    }
  },
  computed: {
    editUrl () {
      return `/subscribers/${this.subscriberId}/edit`
    },
    avatarUrl () {
      return `https://i.pravatar.cc/75?img=${this.subscriberId}`
    },
    isActive () {
      return this.subscriber.state === 'Active'
    },
    isUnsubscribed () {
      return this.subscriber.state === 'Unsubscribed'
    },
    isUnconfirmed () {
      return this.subscriber.state === 'Unconfirmed'
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.startLoading()
      this.loadFields().then(() => {
        this.loadSubscriber().then(() => this.stopLoading())
      })
    },
    loadSubscriber () {
      return this.$repositories.subscribers.show(this.subscriberId).then(({ data }) => {
        this.subscriber = data
      }).catch(() => {
        this.$toast.error('The requested subscriber cannot be loaded').goAway(5000)
        this.$router.push('/subscribers')
      })
    },
    subscribe () {
      this.startLoading()
      return this.$repositories.subscribers.update(this.subscriberId, {
        state: 'Active'
      }).then(({ data }) => {
        this.subscriber = data
        this.$toast.success('User subscribed!').goAway(5000)
      }).catch(() => {
        this.$toast.error('Cannot subscribe user').goAway(5000)
      }).finally(() => this.stopLoading())
    },
    unsubscribe () {
      this.startLoading()
      return this.$repositories.subscribers.update(this.subscriberId, {
        state: 'Unsubscribed'
      }).then(({ data }) => {
        this.subscriber = data
        this.$toast.success('User unsubscribed!').goAway(5000)
      }).catch(() => {
        this.$toast.error('Cannot unsubscribe user').goAway(5000)
      }).finally(() => this.stopLoading())
    }
  }
}
</script>
