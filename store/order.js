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
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}
export const actions = {
  set_cnt({ commit, rootState }, params) {
    commit("SET_CNT", params)
  },
  set_order({ commit, rootState }, params) {
    console.log("set_order=", params)
    commit("SET_ORDER", params)
    commit("SET_CNT")
  },
  set_now({ commit, rootState }, params) {
    console.log("set_now=", params)
    commit("SET_NOW", params)
  },
  get_list({ commit, rootState, dispatch }, params) {
    console.log("set_state=", params)
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
          console.log("get_list  ", res.data.data.item)
          let r = res.data.data.item
          dispatch("order/set_order", r, { root: true })
        }
      })
  },
  state({ commit, rootState, dispatch }, params) {
    console.log("set_state=", params)
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
        "/order/now"
      )
      .then(res => {
        if (res.status == 200) {
          console.log("now  ", res.data.data.item)
          let r = res.data.data.item
          dispatch("order/set_now", r, { root: true })
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
    console.log(params)
    params.forEach(function (element) {
      element.products = groupBy(element.products, "id")
    });
    console.log("params.products:", typeof params.products, params.products)
    state.now = params
  }
}
