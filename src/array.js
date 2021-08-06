
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

      let inserted


      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
        break
      }
      if (inserted) {
        this.__ob__.observeArray(inserted)
      }
      this.__ob__.dep.notify()

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
