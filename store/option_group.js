export const state = () => ({
  opt: [],
  opt_group: []
});
export const getters = {};

export const actions = {
  async add({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .put(
        "/users/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/option_group",
        params
      )
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          dispatch("get_list", params);
          return res.data;
        } else {
          console.log(res);
        }
      });

  }, async delete({ commit, rootState, dispatch }, params) {
    console.log(params);
    return await this.$axios
      .delete(
        "/users/" +
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
          console.log(res);
        }
      });

  }, async update({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .post(
        "/users/" +
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
          console.log(res);
        }
      });

  },
  async get_list({ commit, rootState }, params) {
    return await this.$axios
      .get(
        "/users/" +
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
          console.log(res);
        }
      });
  },
  async repace({ commit, rootState, dispatch }, params) {
    commit("REPLACE", params);
  }
};

export const mutations = {
  SET_LIST(state, params) {
    console.log("______1option_group SET_OPTION_GROUP strat ", params);
    state.opt_group = params;
  }
};
