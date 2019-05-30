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
        dispatch("getme");
      }
      return res.status;
    });
  },
  async getme({ commit, rootState }) {
    return await this.$axios
      .get(`/users/` + rootState.user.auth.user.id)
      .then(res => {
        if (res.status === 200) {
          commit("SET_USER", res.data);
        }
        return res.status;
      });
  }
};

export const mutations = {
  SET_AUTH(state, params) {
    state.auth = params;
  },
  SET_USER(state, params) {
    state.user = params;
  }
};
