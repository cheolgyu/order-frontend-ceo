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
        console.log(params);
        commit("SET_ORDER", JSON.parse(params));
        commit("SET_CNT");
    },


};

export const mutations = {
    SET_CNT(state) {
        state.cnt++;
    },
    SET_ORDER(state, params) {
        state.list.push(params);
    },



};
