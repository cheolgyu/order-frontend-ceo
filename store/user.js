export const state = () => ({
  auth: null
})

export const actions = {
  async join({ commit }, params) {
    await this.$axios.put(`user`, params).then(res => {
      if (res.status === 200) {
        commit('setCar', res.data)
      }
    })
  },
  async login({ commit }, params) {
    await this.$axios.post(`auth`, params).then(res => {
      if (res.status === 200) {
        commit('SET_AUTH', res.data)
      }
    })
  }
}

export const mutations = {
  SET_AUTH(state, params) {
    state.auth = params
    console.log(state.auth)
  }
}
