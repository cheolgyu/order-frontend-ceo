export default function({ store, error }) {
  console.log(error)
  console.log(store.state)
  console.log(store.state.user)
  console.log(store.state.user.auth)
  if (!store.state.user.auth) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
