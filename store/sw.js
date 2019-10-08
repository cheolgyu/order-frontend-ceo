export const state = () => ({
    sw_token: null
});

export const actions = {
    async reg_token({ commit, rootState, dispatch }) {
        let params = {
            name: " 개인 pc ",
            sw_token: rootState.sw.sw_token,
        };
        return await this.$axios
            .put(`/ceo/` + rootState.user.auth.user.id + '/device', params)
            .then(res => {
                if (res.status === 200) {
                    // commit("SEND_TOKEN", res.data.data.user);

                }
                return res;
            });
    },
    async check({ commit, rootState, dispatch }) {

        let params = {
            sw_token: rootState.sw.sw_token,
        };
        return await this.$axios
            .post(`/ceo/` + rootState.user.auth.user.id + '/device', params)
            .then(res => {
                if (res.status === 200) {
                    // commit("SEND_TOKEN", res.data.data.user);

                } else {

                }
                return res;
            });
    },
    async save_token({ commit, rootState, dispatch }, token) {
        commit("SAVE_TOKEN", token);
        return await dispatch("sw/check", null, { root: true }).then(res => {

        });
    }


};

export const mutations = {
    SAVE_TOKEN(state, params) {
        state.sw_token = params;
    },
    SEND(state, params) {
        state.ws_conn.send(params);
    },
    JOIN(state, params) {

        state.ws_conn.send('/join ' + params);
    },


};
