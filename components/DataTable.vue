<template>
  <div>
    <b-row v-if="explicitFilters.length || hasSearchFilter">
      <b-col class="my-1">
        <div v-if="explicitFilters.length" class="mb-4 d-flex align-items-center">
          <div
            v-for="(filter, key) in explicitFilters"
            :key="key"
            class="mr-4"
          >
            <div class="d-flex align-items-center">
              <div class="mr-2">
                {{ filter.label }}
              </div>
              <b-form-select
                v-model="filter.selected"
                :options="filter.options"
                @change="explicitFilterChanged"
                class="mr-2"
                style="width: auto;"
              />
            </div>
          </div>
        </div>
      </b-col>
      <b-col xl="4" class="mt-1 mb-4">
        <b-input-group v-if="hasSearchFilter">
          <b-form-input v-model="searchFilter" placeholder="Type to search" />
          <b-input-group-append>
            <b-button :disabled="!searchFilter" @click="searchFilter = ''">
              Clear
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <div class="position-relative">
      <b-card border-variant="light">
        <b-table-wrapper
          id="vue-table"
          :loading.sync="loading"
          :items="loadItems"
          :fields="fields"
          :perPage="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter="searchFilter"
          head-variant="light"
          show-empty
        />
        <pulse-loader :loading="loading" v-show="loading" />
      </b-card>
      <b-row class="mt-4 mb-4">
        <b-col md="6" class="my-1">
          <div class="d-flex flex-row align-items-center">
            <div class="mr-2">
              View
            </div>
            <b-form-select
              :options="pageOptions"
              v-model="perPage"
              class="perPageSelect"
            />
          </div>
        </b-col>
        <b-col md="6" class="my-1">
          <b-pagination
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            limit="3"
            hide-goto-end-buttons
            class="my-0"
            align="right"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import BTableWrapper from '~/components/BTableWrapper'
import showsLoadingState from '~/mixins/showsLoadingState'

export default {
  components: {
    BTableWrapper
  },
  mixins: [
    showsLoadingState
  ],
  props: {
    repository: {
      type: String,
      required: true
    },
    fields: Array,
    hasSearchFilter: {
      type: Boolean,
      default: false
    },
    explicitFilters: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      sortBy: null,
      sortDesc: false,
      searchFilter: null,
      totalRows: 0,
      currentPage: 1,
      perPage: 25,
      pageOptions: [10, 25, 50, 100]
    }
  },
  methods: {
    loadItems (ctx) {
      this.startLoading()
      return this.$repositories[this.repository]
        .index(this.apiParamsFromCtx(ctx))
        .then((response) => {
          this.stopLoading()
          const items = response.data
          this.totalRows = response.meta.total
          return (items || [])
        }).catch((error) => {
          this.stopLoading()
          this.$toast.error(`Couldn't load data: ${error}`).goAway(5000)
          return []
        })
    },
    explicitFilterChanged () {
      this.$nextTick(() => {
        this.$root.$emit('bv::refresh::table', 'vue-table')
      })
    },
    apiParamsFromCtx (ctx) {
      const filters = Object.assign({
        'search': ctx.filter
      }, ...this.explicitFilters.map(filter => ({ [filter.key]: filter.selected })))

      return {
        page: ctx.currentPage,
        perPage: ctx.perPage,
        filter: filters,
        sort: (ctx.sortDesc ? '-' : '') + ctx.sortBy
      }
    }
  }
}
</script>

<style>
.table.b-table {
  margin: 0;
}

.perPageSelect {
  width: auto;
}
</style>
