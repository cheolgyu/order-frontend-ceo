export const state = () => ({
    cnt: 0,
    icon: {
        t: "notifications",
        f: "notifications_none",
        state: "notifications_none"
    },
    list: []
});

export const actions = {
    set_cnt({ commit, rootState }, params) {
        commit("SET_CNT", params);
    },
    set_order({ commit, rootState }, params) {
        console.log("set_order=", params);
        commit("SET_ORDER", params);
        commit("SET_CNT");
    },
    get_list({ commit, rootState, dispatch }, params) {
        console.log("set_state=", params);
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
                    let r = res.data.data.item;
                    dispatch("order/set_order", r, { root: true });

                }
            });
    },
    state({ commit, rootState, dispatch }, params) {
        console.log("set_state=", params);
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
                    dispatch("ws/send", params, { root: true });

                } else {
                }
            });
    },


};

export const mutations = {
    SET_CNT(state) {
        state.cnt++;
    },
    SET_ORDER(state, params) {
        //state.list.push(params);
        state.list = params;
    },



};
