export const state = () => ({
  list: []
});
export const getters = {};

export const actions = {
  async add({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .put(
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/option_group",
        params
      )
      .then(res => {
        if (res.status == 200) {
          dispatch("get_list", params);
          return res.data;
        } else {
        }
      });

  }, async delete({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .delete(
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/option_group/" + params.id

      )
      .then(res => {
        if (res.status == 200) {
          dispatch("get_list", params);
          return res.data;
        } else {
        }
      });

  }, async update({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .post(
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/option_group",
        params
      )
      .then(res => {
        if (res.status == 200) {
          dispatch("get_list", params);
          return res.data;
        } else {
        }
      });

  },
  async get_list({ commit, rootState }, params) {
    return await this.$axios
      .get(
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/option_group",
        params
      )
      .then(res => {
        if (res.status == 200) {
          commit("SET_LIST", res.data.data.items);
          return res;
        } else {
        }
      });
  }
};

export const mutations = {
  SET_LIST(state, params) {
    state.list = params;
  }
};
