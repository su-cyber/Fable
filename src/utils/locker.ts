import EventEmitter from 'events'

const bus = new EventEmitter()

export const locker = {
    isLock: true,

    async wait() {
        if (this.isLock) {
            await new Promise(r =>
                bus.on('unlock', () => {
                    this.isLock = false
                    r(0)
                })
            )
        }
    },

    lock() {
        this.isLock = true
    },
    unlock() {
        bus.emit('unlock')
    },
}
