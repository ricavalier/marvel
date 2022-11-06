export default {
  STORE_FAV_LIST (state, payload) {
    state.favList = payload
    const fav = window.btoa(JSON.stringify(payload))
    localStorage.setItem('x-fav', fav)
    localStorage.setItem('mytime', Date.now())
  }
}
