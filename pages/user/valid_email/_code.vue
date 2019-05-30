<template>
  <h1>이메일을 인증 중입니다.</h1>
</template>

<script>
import { mapState } from "vuex";

export default {
  fetch({ store, params }) {
    console.log(params);
    return store.dispatch("auth/chk_valid_email", params).then(res => {
      if (res.data.status === 200) {
        alert("인증 됬습니다.");
      } else {
        alert("다시 시도하세요.");
      }
    });
  }
};
</script>
