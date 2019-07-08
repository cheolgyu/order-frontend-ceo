<template>
  <h1>이메일을 인증 중입니다.</h1>
</template>

<script>
import { mapState } from "vuex";

export default {
  fetch({ store, params }) {
    console.log(params);
    return store.dispatch("auth/chk_valid_email", params).then(res => {
      alert(res);
    });
  }
};
</script>
