
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach((method) => {
  const original = arrayProto[method]
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      const res = arrayProto[method].call(this, args)
      console.log('array reactive')
      return res
    },
    configurable: true,
    writable: true,
    enumerable: true
  })

})


export default function protoArguments(arr) {
  arr.__proto__ = arrayMethods
}
