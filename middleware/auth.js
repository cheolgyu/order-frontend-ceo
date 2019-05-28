export default function({ store, redirect }) {
  if (store.state.user.auth == null) {
    return redirect('/login')
  }
}
