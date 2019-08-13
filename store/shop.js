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
          "/ceo/" +
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
  },
  async add({ commit, rootState }, params) {
    var d = {
      type: "add",
      method: "put",
      url: "/ceo/" + rootState.user.auth.user.id + "/shops"
    };
    if (rootState.shop.shop != null) {
      d.type = "update";
      d.method = "post"
    }

    return await this.$axios({ method: d.method, url: d.url, data: params })
      .then(res => {
        if (res.status === 200) {
          commit("SET_SHOP", res.data);
          return res.status
        }
      });

  }
};

export const mutations = {
  SET_SHOP(state, params) {
    state.shop = params;
  }
};
