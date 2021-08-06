import defineReactive from './defineReactive.js'
import protoArguments from './array.js'


export function observe(value) {
  if (typeof value !== 'object') return

  if (value.__ob__) return value.__ob__


  return new Observer(value)
}


export function Observer(value) {
  Object.defineProperty(value, '__ob__', {
    value: this,
    enumerable: false,
    configurable: true, /* 是否可删 */
    writable: true
  })

  if (Array.isArray(value)) {
    protoArguments(value)
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}

Observer.prototype.walk = function walk(obj) {
  const keys = Object.keys(obj)
  for (let i = 0, len = keys.length; i < len; i++){
      defineReactive(obj,keys[i], obj[keys[i]])
  }
}

Observer.prototype.observeArray = function (items) {
  for (let i = 0, l = items.length; i < l; i++) {
    observe(items[i])
  }
}