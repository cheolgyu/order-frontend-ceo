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
        console.log(res)
        if (res.status == 200) {
          dispatch("get_list", params);
          return res.data;
        } else {
          console.log(res);
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
          } else { console.log(res) }

        });
    } else {
      console.log("product action.get shop is null ");
    }
  },
  async repace({ commit, rootState, dispatch }, params) {
    commit("REPLACE", params);
  },
};

export const mutations = {
  SET_LIST(state, params) {
    console.log("______ product SET_LIST strat ", params);
    state.list = params;
  },
  PUSH(state, params) {
    console.log("product PUSH strat ", state.list);
    state.list.push(params);
    console.log(state.list);
  },
  REPLACE(state, params) {
    console.log("product REPLACE strat ", state.list);
    state.list.push(params);
    console.log(state.list);
  }
};
