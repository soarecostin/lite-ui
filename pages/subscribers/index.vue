<template>
  <div>
    <title-bar title="Subscribers">
      <template slot="button">
        <b-button to="/subscribers/add" size="lg" variant="orange">
          Add subscribers
        </b-button>
      </template>
      <subscribers-submenu />
    </title-bar>
    <div class="container">
      <data-table
        :fields="fields"
        :explicitFilters="filters"
        :has-search-filter="true"
        repository="subscribers"
      >
        <template v-slot:cell(name)="data">
          <nuxt-link :to="`/subscribers/${data.item.id}`">
            {{ data.value }}
          </nuxt-link>
        </template>
        <template v-slot:cell(actions)="data">
          <nuxt-link :to="`/subscribers/${data.item.id}`">
            <b-icon icon="eye" class="h4 m-0 mr-2"></b-icon>
          </nuxt-link>
          <nuxt-link :to="`/subscribers/${data.item.id}/edit`">
            <b-icon icon="pencil" class="h4 m-0 mr-2"></b-icon>
          </nuxt-link>
          <b-link v-on:click="showDeleteModal(data.item)" href="#">
            <b-icon icon="trash" class="h4 m-0 mr-2"></b-icon>
          </b-link>
        </template>
      </data-table>
    </div>
    <b-modal v-model="deleteModal" @ok="deleteSubscriber" title="Delete subscriber">
      <div class="my-2">
        <p>Are you sure you want to delete this subscriber?</p>
      </div>
      <template slot="modal-ok">
        Delete
      </template>
    </b-modal>
  </div>
</template>

<script>
import DataTable from '~/components/DataTable'
import SubscribersSubmenu from '~/components/submenus/SubscribersSubmenu'

export default {
  middleware: ['auth'],
  components: {
    DataTable,
    SubscribersSubmenu
  },
  data () {
    return {
      deleteModal: false,
      subscriberToDelete: null,
      fields: [
        {
          key: 'id',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'email',
          sortable: true
        },
        {
          key: 'date_subscribe',
          label: 'Subscribed',
          sortable: false
        },
        {
          key: 'actions',
          label: '',
          sortable: false,
          class: 'text-right'
        }
      ],
      filters: [
        {
          key: 'state',
          label: 'Showing',
          selected: 'All',
          options: [
            { 'text': 'All', 'value': 'All' },
            { 'text': 'Active', 'value': 'Active' },
            { 'text': 'Unconfirmed', 'value': 'Unconfirmed' },
            { 'text': 'Unsubscribed', 'value': 'Unsubscribed' }
          ]
        }
      ]
    }
  },
  methods: {
    showDeleteModal (subscriber) {
      this.deleteModal = true
      this.subscriberToDelete = subscriber
    },
    deleteSubscriber () {
      this.$repositories.subscribers.delete(this.subscriberToDelete.id).then(() => {
        this.$toast.success('The subscriber was deleted!').goAway(5000)
        this.$root.$emit('bv::refresh::table', 'vue-table')
      })
    }
  }
}
</script>
