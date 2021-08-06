import { observe } from "./observe.js";

export default function defineReactive(obj,key,val) {
  observe(val)

  Object.defineProperty(obj, key, {

    get() {
      console.log(`getter: key = ${key}`)
      return val
    },


    set(newVal) {
      console.log(`setter: ${key} = ${newVal}`)
      if (newVal === val) return
      val = newVal
      observe(newVal)
    }

  })


}