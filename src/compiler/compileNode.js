import Watcher from '../watcher.js'

export default function compileNode(nodes, vm) {
  for (let i = 0, len = nodes.length; i < len; i++) {
    const node = nodes[i]


    if (node.nodeType === 1) {
      compileAttribute(node, vm)
      compileNode(Array.from(node.childNodes), vm)
    } else if (node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)) {
      compileTextNode(node, vm)
    }
  }
}


function compileTextNode(node, vm) {

  const key = RegExp.$1.trim()

  function cb() {
    node.textContent = vm[key]
  }

  new Watcher(cb)
}

function compileAttribute(node, vm) {
  const attrs = Array.from(node.attributes)

  for (const attr of attrs) {
    const { name, value } = attr
     if (name.match(/v-on:click/)) {
      compileVOnClick(node, value, vm)
    } else if (name.match(/v-bind:(.*)/)) {
      compileVBind(node, value, vm)
    } else if (name.match(/v-model/)) {
      // compileVModel(node, value, vm)
    }
  }
}


function compileVOnClick(node, method, vm) {
  node.addEventListener('click', function (...args) {
    vm.$options.methods[method].apply(vm,args)
  })
}

function compileVBind(node, attrValue, vm) {
  const attrName = RegExp.$1
  node.removeAttribute(`v-bind:${attrName}`)

  function cb() {
    node.setAttribute(attrName, vm[attrValue])
  }

  new Watcher(cb)
}