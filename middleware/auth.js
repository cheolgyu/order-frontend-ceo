export default function({ store, redirect, route }) {
  if (store.state.user.auth == null) {
    localStorage.setItem("redirect", route.path);
    return redirect("/login");
  }
}
