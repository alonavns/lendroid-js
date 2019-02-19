export * from './contracts'
export * from './exchanges'
export * from './orders'
export * from './loans'
export * from './logger'
export * from './web3Utils'

export const debounce = (func, wait, immediate) => {
  let timeout = -1
  //tslint:disable
  return function() {
    const context = this
    const args = arguments
    const later = () => {
      timeout = -1
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    if (timeout !== -1) {
      clearTimeout(timeout)
    }
    /* tslint:disable-next-line */
    timeout = Number(setTimeout(later, wait))
    if (callNow) {
      func.apply(context, args)
    }
  }
  //tslint:enable
}
