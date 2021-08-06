import Dep from "./dep.js";


export default function Watcher(cb){
  this._cb = cb

  Dep.target = this

  cb()

  Dep.target = null
}

Watcher.prototype.update = function () {
  this._cb()
}