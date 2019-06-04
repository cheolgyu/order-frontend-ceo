export const state = () => ({
  auth: null,
  user: null
});

export const actions = {
  async join({ commit }, params) {
    return await this.$axios
      .put(`auth`, params)
      .then(res => {
        return res;
      })
      .catch(error => {
        return error.response;
      });
  },
  async login({ commit, dispatch }, params) {
    return await this.$axios.post(`auth`, params).then(res => {
      if (res.status === 200) {
        commit("SET_AUTH", res.data);
        return dispatch("getme");
      }
      return res.status;
    });
  },
  async getme({ commit, rootState, dispatch }) {
    return await this.$axios
      .get(`/users/` + rootState.user.auth.user.id)
      .then(res => {
        if (res.status === 200) {
          commit("SET_USER", res.data.data.user);
          commit("shop/SET_SHOP", res.data.data.shop, { root: true });
          return dispatch("product/get", null, { root: true });
        }
        return res.status;
      });
  }
};

export const mutations = {
  SET_AUTH(state, params) {
    console.log("______user SET_AUTH strat ", params);
    state.auth = params;
  },
  SET_USER(state, params) {
    console.log("______user SET_USER strat ", params);
    state.user = params;
  }
};
