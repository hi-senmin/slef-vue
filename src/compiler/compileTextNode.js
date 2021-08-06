// <span>{{ key }}</span>
import Watcher from '../watcher'
export default function compileTextNode(node, vm) {

  const key = RegExp.$1.trim()

  function cb() {
    node.textContent = vm[key]
  }

  new Watcher(cb)
}