<template>
  <div>
    <title-bar title="Personal access tokens" class="pb-4">
      <template slot="button">
        <b-button to="/tokens/add" size="lg" variant="orange">
          Generate new token
        </b-button>
      </template>
    </title-bar>
    <div class="container">
      <b-alert variant="info" show class="mb-4">
        Personal access token function like ordinary OAuth access tokens. They can be used to authenticate to the API over Basic Authentication.
      </b-alert>
      <data-table :fields="fields" repository="tokens">
        <template v-slot:cell(actions)="data">
          <b-link v-on:click="showDeleteModal(data.item)" href="#">
            <b-icon icon="trash" class="h4 m-0 mr-2"></b-icon>
          </b-link>
        </template>
      </data-table>
    </div>
    <b-modal v-model="deleteModal" @ok="deleteToken" title="Are you sure you want to delete this token?">
      <div class="my-2">
        <b-alert show variant="danger">
          <strong>Warning</strong>: Any applications or scripts using this token will no longer be able to access this API. You cannot undo this action.
        </b-alert>
      </div>
      <template slot="modal-ok">
        Delete
      </template>
    </b-modal>
  </div>
</template>

<script>
import DataTable from '~/components/DataTable'

export default {
  middleware: ['auth'],
  components: {
    DataTable
  },
  data () {
    return {
      deleteModal: false,
      tokenToDelete: null,
      fields: [
        {
          key: 'name',
          sortable: false
        },
        {
          key: 'last_used_at',
          sortable: false
        },
        {
          key: 'actions',
          label: '',
          sortable: false,
          class: 'text-right'
        }
      ]
    }
  },
  methods: {
    showDeleteModal (token) {
      this.deleteModal = true
      this.tokenToDelete = token
    },
    deleteToken () {
      this.$repositories.tokens.delete(this.tokenToDelete.id).then(() => {
        this.$toast.success('The token was deleted!').goAway(5000)
        this.$root.$emit('bv::refresh::table', 'vue-table')
      })
    }
  }
}
</script>
