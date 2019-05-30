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
  async chk_valid_email({ commit, rootState }, params) {
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
        return res;
      })
      .catch(error => {
        return error.response;
      });
  }
};

export const mutations = {};
