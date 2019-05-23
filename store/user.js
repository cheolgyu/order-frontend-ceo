export const actions = {
  async join({ commit }, params) {
    console.log(params)
    await this.$axios.put(`user`, params).then(res => {
      if (res.status === 200) {
        commit('setCar', res.data)
      }
    })
  }
}
