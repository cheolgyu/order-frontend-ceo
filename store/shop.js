export const state = () => ({
  shop: null
})

export const actions = {
  async get({ commit, rootState }, params) {
    await this.$axios
      .get(
        '/users/' +
          rootState.user.auth.user.id +
          '/shops/109b7b41-f8eb-4702-abdb-6bfb95f57072',
        params
      )
      .then(res => {
        if (res.status === 200) {
          commit('SET_SHOP', res.data)
        }
      })
  }
}

export const mutations = {
  SET_SHOP(state, params) {
    state.shop = params
    console.log(state.shop)
  }
}
