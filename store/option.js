export const state = () => ({
  list:[]
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
        "/option",
        params
      )
      .then(res => {
        if (res.status == 200) {
          dispatch("get_list", params);
          return res;
        } else {
          console.log(res);
        }
      });

  },async update({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .post(
        "/users/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/option",
        params
      )
      .then(res => {
        if (res.status == 200) {
          dispatch("get_list", params);
          return res;
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
        "/option",
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
  }
};

export const mutations = {
  SET_LIST(state, params) {
    console.log("______option_group SET_OPTION_GROUP strat ", state.list);
    state.list = params;
  }
};
