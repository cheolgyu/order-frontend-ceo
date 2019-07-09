export const state = () => ({
  list: [],
});
export const getters = {

  product_list: state => {
    return state.list
  }
}

export const actions = {
  async push({ commit, rootState, dispatch }, params) {
    commit("PUSH", params);
  },
  async add({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .put(
        "/users/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/products",
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
  async update({ commit, rootState, dispatch }, params) {
    return await this.$axios
      .post(
        "/users/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/products/" + params.id
        ,
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
        "/products",
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
  async get({ commit, rootState }, params) {
    if (rootState.shop.shop != null) {
      return await this.$axios
        .get(
          "/users/" +
          rootState.user.auth.user.id +
          "/shops/" +
          rootState.shop.shop.id +
          "/products",
          params
        )
        .then(res => {
          if (res.status == 200) {
            commit("SET_LIST", res.data.data.items);
            return res
          } else { }

        });
    } else {
    }
  },
};

export const mutations = {
  SET_LIST(state, params) {
    state.list = params;
  },
  PUSH(state, params) {
    state.list.push(params);
  },

};
