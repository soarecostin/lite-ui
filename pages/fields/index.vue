<template>
  <div>
    <title-bar title="Subscribers">
      <template slot="button">
        <b-button to="/fields/add" size="lg" variant="orange">
          Add field
        </b-button>
      </template>
      <subscribers-submenu />
    </title-bar>
    <div class="container">
      <data-table :fields="fields" repository="fields">
        <template v-slot:cell(title)="data">
          <nuxt-link :to="`/fields/${data.item.id}/edit`">
            {{ data.value }}
          </nuxt-link>
        </template>
        <template v-slot:cell(actions)="data">
          <nuxt-link :to="`/fields/${data.item.id}/edit`">
            <b-icon icon="pencil" class="h4 m-0 mr-2"></b-icon>
          </nuxt-link>
          <b-link v-on:click="showDeleteModal(data.item)" href="#">
            <b-icon icon="trash" class="h4 m-0 mr-2"></b-icon>
          </b-link>
        </template>
      </data-table>
    </div>
    <b-modal v-model="deleteModal" @ok="deleteField" title="Are you sure you want to delete this field?">
      <div class="my-2">
        <b-alert show variant="danger">
          <strong>Warning</strong>: All associated subscribers data will be lost!
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
      fieldToDelete: null,
      fields: [
        {
          key: 'title',
          sortable: true
        },
        {
          key: 'type',
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
    showDeleteModal (field) {
      this.deleteModal = true
      this.fieldToDelete = field
    },
    deleteField () {
      this.$repositories.fields.delete(this.fieldToDelete.id).then(() => {
        this.$toast.success('The field was deleted!').goAway(5000)
        this.$root.$emit('bv::refresh::table', 'vue-table')
      })
    }
  }
}
</script>
