import { observe } from "./observe.js";
import Dep from "./dep.js";

export default function defineReactive(obj,key,val) {
 const childOb =  observe(val)
 const dep = new Dep()

  Object.defineProperty(obj, key, {

    get() {
      console.log(`getter: key = ${key}`)
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },


    set(newVal) {
      console.log(`setter: ${key} = ${newVal}`)
      if (newVal === val) return
      val = newVal
      observe(newVal)


      dep.notify()
    }

  })


}