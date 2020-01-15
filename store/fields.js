export const state = () => ({
  list: []
})

export const actions = {
  all ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$repositories.fields.index().then((response) => {
        commit('setFields', response.data)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  setFields (state, fields) {
    state.list = fields
  },
  reset (state) {
    state.list = []
  }
}
