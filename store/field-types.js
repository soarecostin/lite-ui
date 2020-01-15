export const state = () => ({
  types: []
})

export const actions = {
  all ({ commit, state }) {
    return new Promise((resolve, reject) => {
      state.types.length > 0
        ? resolve()
        : this.$repositories.fieldTypes.index().then((response) => {
          commit('set', response)
          resolve()
        }).catch((error) => {
          reject(error)
        })
    })
  }
}

export const mutations = {
  set (state, types) {
    state.types = types
  }
}
