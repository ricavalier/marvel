export class Debounce {
  static execute (timer, action, wait) {
    clearInterval(timer)
    return setTimeout(action, wait)
  }
}
