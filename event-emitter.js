class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(type, listener) {
    if (this.events[type]) {
      this.events[type] = [listener]
    } else {
      this.events[type].push(listener)
    }
  }

  off(type, listener) {
    if (!this.events[type]) return
    this.events[type] = this.events[type].filter(l => l !== listener)
  }

  once(type, listener) {
    const fn = function () {
      listener()
      this.events.off(type, fn)
    }
    this.events.on(type, fn)
  }

  emit(type, ...rest) {
    if (!this.events[type]) return
    this.events[type].forEach(listener => {
      listener.apply(this, rest)
    });
  }
}