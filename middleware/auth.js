export default function ({ store, redirect, route }) {
  let jwt = localStorage.getItem("jwt");
  console.log(jwt);

  if (store.state.user.auth == null) {
    localStorage.setItem("redirect", route.path);
    return redirect("/login");
  }
}
