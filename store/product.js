export const state = () => ({
  list: [
    {
      name: "11111",
      id: 2
    },
    {
      name: "2222",
      id: 0
    },
    {
      name: "33333",
      id: 1
    }
  ]
});

export const actions = {
  async push({ commit, rootState, dispatch }, params) {
    commit("PUSH", params);
  },
  async get({ commit, rootState }, params) {
    console.log(rootState.shop.shop);
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
          if (res.status === 200) {
            commit("SET_PRODUCTS", res.data);
          }
        });
    } else {
      console.log("product action.get shop is null ");
    }
  }
};

export const mutations = {
  SET_PRODUCTS(state, params) {
    console.log("product PUSH strat ", state.list);
    state.list = params;
    console.log(state.list);
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
