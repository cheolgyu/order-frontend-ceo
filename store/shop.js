export const state = () => ({
  shop: null
});

export const actions = {
  async chk_shop({ commit, rootState, dispatch }, params) {
    return await dispatch("user/getme", null, { root: true }).then(res => {

      if (res === 200) {
        return dispatch("shop/get");
      } else {
        return res;
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
          rootState.shop.shop.id,
          params
        )
        .then(res => {
          if (res.status === 200) {
            commit("SET_SHOP", res.data);
            return res.state
          }
        });
    } else {
      console.log("shop action.get shop is null ");
    }
  }
};

export const mutations = {
  SET_SHOP(state, params) {
    state.shop = params;
  }
};
