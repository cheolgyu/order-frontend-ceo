export const state = () => ({
    ws_conn: null
});

export const actions = {
    set({ commit, rootState }, params) {
        commit("SET_CONN", params);
    },
    buy({ commit, rootState }) {
        var list = rootState.cart.list;
        commit("BUY", list);
    },
    join({ commit, rootState }) {
        console.log(rootState.shop.shop.id)
        commit("JOIN", rootState.shop.shop.id);
    },


};

export const mutations = {
    SET_CONN(state, params) {
        state.ws_conn = params;
    },
    BUY(state, params) {
        state.ws_conn.send(params);
    },
    JOIN(state, params) {
        console.log("join room " + params);
        state.ws_conn.send('/join ' + params);
    },


};
