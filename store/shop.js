export const state = () => ({
  shop: null
});

export const actions = {
  async chk_shop({ commit, rootState, dispatch }, params) {
    console.log("shop action.chk_shop strat ");
    return await dispatch("user/getme", null, { root: true }).then(res => {
      console.log("shop action.chk_shop.user/get return strat ");
      if (res === 200) {
        return dispatch("shop/get");
      } else {
        return res;
      }
    });
  },
  async get({ commit, rootState }, params) {
    console.log(rootState.shop.shop);
    if (rootState.shop.shop != null) {
      return await this.$axios
        .get(
          "/users/" +
            rootState.user.auth.user.id +
            "/shops/" +
            rootState.shop.shop.id,
          params
        )
        .then(res => {
          if (res.status === 200) {
            commit("SET_SHOP", res.data);
          }
        });
    } else {
      console.log("shop action.get shop is null ");
    }
  }
};

export const mutations = {
  SET_SHOP(state, params) {
    console.log("shop SET_SHOP strat ");
    state.shop = params;
    console.log(state.shop);
  }
};
