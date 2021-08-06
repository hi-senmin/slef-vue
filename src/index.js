import initData from "./initData.js"
import mount from "./compiler/index.js"
export default function Vue(options) {
  this.__init__(options)
}

Vue.prototype.__init__ = function (options) {

  this.$options = options
  initData(this)

  if (this.$options.el) {
    this.$mount()
  }
}


Vue.prototype.$mount = function () {
  mount(this)
}