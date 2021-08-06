const noop = () => { }

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}


export function proxy(target, sourceKey, key) {
  // console.log(target, sourceKey, key);
  sharedPropertyDefinition.get = function proxyGetter() {
    return target[sourceKey][key]
  }

  sharedPropertyDefinition.set = function proxySetter(val) {
    target[sourceKey][key] = val
  }

  Object.defineProperty(target, key, sharedPropertyDefinition)
}