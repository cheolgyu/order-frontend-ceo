<template></template>

<script>
export default {
  order_state: function order_state(state) {
    var str = "";
    if (state === -2) {
      str = "미응답거절";
    } else if (state === -1) {
      str = "거절";
    } else if (state === 1) {
      str = "대기";
    } else if (state === 2) {
      str = "수락";
    } else if (state === 3) {
      str = "수령";
    }

    return str;
  }
};
</script>
