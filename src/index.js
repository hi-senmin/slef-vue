import initData from "./initData.js"

export default function Vue(options) {
  this.__init__(options)
}

Vue.prototype.__init__ = function (options) {

  this.$options = options
  initData(this)

}