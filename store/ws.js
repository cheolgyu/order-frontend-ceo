export const state = () => ({
    ws_conn: null
});

export const actions = {
    set({ commit, rootState }, params) {
        commit("SET_CONN", params);
    },
    send({ commit, rootState }, params) {
        commit("SEND", params);
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
    SEND(state, params) {
        state.ws_conn.send(params);
    },
    JOIN(state, params) {
        console.log("join room " + params);
        state.ws_conn.send('/join ' + params);
    },


};
