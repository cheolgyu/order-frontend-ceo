export const state = () => ({
  auth: null
})

export const actions = {
  async join({ commit }, params) {
    return await this.$axios.put(`auth`, params).then(res => {
      return res;
    }).catch(error => { return error.response });
  },
  async login({ commit }, params) {
    const res = await this.$axios.post(`auth`, params).then(res => {
      if (res.status === 200) {
        commit('SET_AUTH', res.data)
      }
      return res.status
    })
    return res
  }
}

export const mutations = {
  SET_AUTH(state, params) {
    state.auth = params
  }
}
