export const state = () => ({
  auth: null
});

export const actions = {
  async valid_email({ commit, rootState }, params) {
    console.log(params);
    return await this.$axios
      .put("/users/" + rootState.user.auth.user.id + "/valid_email", params)
      .then(res => {
        return res;
      })
      .catch(error => {
        return error.response;
      });
  },
  async chk_valid_email({ commit, rootState, dispatch }, params) {
    let d = {
      code: params.code,
      v: {
        user_id: rootState.user.auth.user.id,
        kind: "email",
        kind_value: rootState.user.auth.user.email
      }
    };
    return await this.$axios
      .post("/users/" + rootState.user.auth.user.id + "/valid_email", d)
      .then(res => {
        var msg = "다시 시도하세요.";
        if (res.data.status === 200) {
          msg = "인증 됬습니다.";
          dispatch("user/getme", null, { root: true });
        }
        return msg;
      })
      .catch(error => {
        return error.response;
      });
  }
};

export const mutations = {};
