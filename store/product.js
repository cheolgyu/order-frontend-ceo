export const state = () => ({
  list: [],
  option_group: [
    { "name": "이름1", "price": 100 },
    { "name": "이름2", "price": 100 },
    { "name": "이름3", "price": 100 },
    { "name": "이름4", "price": 100 }
  ]
});
export const  getters= {
  
  product_list: state => {
      return state.list
    }
  }

export const actions = {
  async push({ commit, rootState, dispatch }, params) {
    commit("PUSH", params);
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
            commit("SET_PRODUCTS", res.data.data.items);
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
  SET_PRODUCTS(state, params) {
    console.log("______ product SET_PRODUCTS strat ", params);
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
