export const state = () => ({
  cnt: 0,
  icon: {
    t: "notifications",
    f: "notifications_none",
    state: "notifications_none"
  },
  list: [],
  now: []
})

export const actions = {
  set_cnt({ commit, rootState }, params) {
    commit("SET_CNT", params)
  },
  set_order({ commit, rootState }, params) {
    commit("SET_ORDER", params)
    commit("SET_CNT")
  },
  set_now({ commit, rootState }, params) {
    commit("SET_NOW", params)
  },
  get_list({ commit, rootState, dispatch }, params) {
    this.$axios
      .get(
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/order"
      )
      .then(res => {
        if (res.status == 200) {
          let r = res.data.data.item
          dispatch("order/set_order", r, { root: true })
        }
      })
  },
  state({ commit, rootState, dispatch }, params) {

    this.$axios
      .put(
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/order_detail",
        params
      )
      .then(res => {
        if (res.status == 200) {
          dispatch("ws/send", params, { root: true })
          dispatch("order/now", params, { root: true })
        } else {
        }
      })
  },
  now({ commit, rootState, dispatch }, params) {
    this.$axios
      .get(
        "/ceo/" +
        rootState.user.auth.user.id +
        "/shops/" +
        rootState.shop.shop.id +
        "/order_now"
      )
      .then(res => {
        if (res.status == 200) {
          let r = res.data.data.item
          dispatch("order/set_now", r, { root: true });

        }
      })
  }
}

export const mutations = {
  SET_CNT(state) {
    state.cnt++
  },
  SET_ORDER(state, params) {
    //state.list.push(params);
    state.list = params
  },
  SET_NOW(state, params) {
    //state.list.push(params);
    state.now = params
  }
}
