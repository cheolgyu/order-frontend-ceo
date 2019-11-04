export default function ({ store, redirect, route }) {
  let jwt = localStorage.getItem("jwt");
  let old_state = JSON.parse(localStorage.getItem('togo82_state'));

  let cur_state = store.state;
  if (cur_state.user.auth != null && jwt != null) {
    //기존 창
  } else {
    // 새로운 창
    if (old_state != null && jwt != null && old_state.user.auth !== undefined) {
      //state 복구
      store.replaceState(old_state);
    } else {
      localStorage.setItem("redirect", route.path);
      return redirect("/login");
    }
  }



}
