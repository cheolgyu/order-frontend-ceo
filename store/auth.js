export const state = () => ({
  auth: null
});

export const actions = {
  async valid_email({ commit, rootState }, params) {
    console.log(params);
  return  await this.$axios
      .put("/users/" + rootState.user.auth.user.id + "/valid_email", params)
      .then(res => {
        return res;
      })
      .catch(error => {
        return error.response;
      });
  }
};

export const mutations = {};
