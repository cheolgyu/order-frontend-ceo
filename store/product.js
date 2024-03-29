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
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/products",
        params
      )
      .then(res => {
        if (res.status == 200) {
          alert("등록되었습니다.");
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
        "/products/" + params.id

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
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/products/" + params.id
        ,
        params
      )
      .then(res => {
        if (res.status == 200) {
          alert("수정되었습니다.");
          dispatch("get_list", params);
          return res.data;
        } else {

        }
      });

  },
  async get_list({ commit, rootState }, params) {
    let url = "/ceo/" + rootState.user.auth.user.id +
      "/shops/" + rootState.shop.shop.id + "/products";

    let { data } = await this.$axios.get(url, params);
    if (data.status === 200) {

      commit("SET_LIST", data.data.shop_info.s_info.p);
    } else {

    }
  },
  async get({ commit, rootState }, params) {
    if (rootState.shop.shop != null) {
      return await this.$axios
        .get(
          "/ceo/" +
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
    for (var i = 0; i < params.length; i++) {
      if (params[i].og[0].og_id == null) {
        params[i].og = [];
      }
    }
    state.list = params;
  },
  PUSH(state, params) {
    state.list.push(params);
  },

};
