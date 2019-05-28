export default function({ $axios, store }) {
  $axios.onRequest(config => {
    const user = store.state.user
    if (user.auth != null) {
      config.headers.common.Authorization = user.auth.token
    }
    console.log('Making request to ' + config.url)
  })
  /*
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(error)
    if (code === 400) {
      // redirect('/400')
    }
  })
  */
}
