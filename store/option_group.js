export const state = () => ({
  opt: [
    { name: "샷추가", price: 500 },
    { name: "차가운", price: 1000 },
    { name: "뜨거운", price: 1000 },
    { name: "바닐라 추가", price: 100 },
    { name: "초코 추가", price: 100 },
    { name: "크림 추가", price: 100 }
  ],
  opt_group: [
    { name: "온도 선택" },
    { name: "크림 선택" },
    { name: "크림 선택" },
    { name: "크림 선택" }
  ]
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

  },async update({ commit, rootState, dispatch }, params) {
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
        if (res.status == 201) {
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
        "/option_group",
        params
      )
      .then(res => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.data)
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
