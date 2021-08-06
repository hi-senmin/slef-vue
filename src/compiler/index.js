import compileNode from './compileNode.js'

export default function mount(vm) {
  const el = document.querySelector(vm.$options.el)
  console.log('el',el);
  compileNode(Array.from(el.childNodes),vm)

}