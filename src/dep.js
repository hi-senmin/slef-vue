export default function Dep() {
  this.watchers = [];
}

Dep.target = null;

Dep.prototype.depend = function () {
  if (this.watchers.includes(Dep.target)) return;
  this.watchers.push(Dep.target);
};

Dep.prototype.notify = function () {
  for (const watcher of this.watchers) {
    watcher.update();
  }
};
