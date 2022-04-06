import cloneDeep from 'lodash.clonedeep'
import range from 'lodash.range'
import { Effect } from '../classes/effect'

import { Entity } from '../classes/entity'

// prettier-ignore
type TaskOptions = {
    check   : (attacker: Entity, defender: Entity) => boolean
    run     : () => void
    end     : () => void
    runEnd  : () => void
    skipTurn: boolean
    id      : string
    effect? : Effect
    turns   : number
}

// prettier-ignore
type TaskImplement = {
    check   : (f: (attacker: Entity, defender: Entity) => boolean) => Task
    run     : (f: () => void)                                      => void
    end     : (f: () => void)                                      => Task
    id      : (s: string)                                          => Task
    turns   : (turns: number)                                      => Task
    effect  : (effect: Effect)                                     => Task
    skipTurn: Task
}

class Task implements TaskImplement {
    options: TaskOptions

    // prettier-ignore
    constructor(public scheduler: Scheduler) {
        this.options = {
            turns   : undefined,
            id      : undefined,
            check   : undefined,
            run     : undefined,
            end     : undefined,
            effect  : undefined,
            runEnd  : undefined,
            skipTurn: false,
        }
    }

    /**
     * Check done each turn, if true the task is executed
     */
    check(f: (attacker: Entity, defender: Entity) => boolean) {
        this.options.check = f
        return this
    }

    turnOf(entity: Entity) {
        this.options.check = (attacker, defender) => attacker.equals(entity)
        return this
    }

    /**
     * Function to be executed in the task
     */
    run(f: () => void) {
        this.options.run = f
        return this
    }

    id(s: string) {
        this.options.id = s
        return this
    }

    /**
     * Function executed at the end of the task
     *
     * If the task is executed for multiple turns, `end` will be executed at the end of all turns
     */
    end(f: () => void) {
        this.options.end = f
        return this
    }

    /**
     * Sets the number of turns the task will be executed
     */
    turns(turns: number) {
        this.options.turns = turns
        return this
    }

    /**
     * Sets the task as an effect
     */
    effect(effect: Effect) {
        this.options.effect = effect
        return this
    }

    /**
     * Executes the task without doing a check
     */
    get all() {
        this.options.check = () => true
        return this
    }

    /**
     * When the task is executed, jump to the next turn
     */
    get skipTurn() {
        this.options.skipTurn = true
        return this
    }

    toString() {
        return `Task: ${this.options.id}`
    }
}

class Scheduler {
    scheduler: Task[][]
    ids: { [id: string]: string }

    constructor() {
        this.scheduler = []
        this.ids = {}
    }

    /**
     * Creates a new task
     */
    get task() {
        return new Task(this)
    }

    add(task: Task) {
        const task_exists = this.search(this.scheduler, task)
        let t: Task = null

        async function runEnd() {
            task.options.run()
            task.options.end()
        }

        if (task.options.effect && task_exists) {
            const { r, c } = task_exists
            const l = range(1, task.options.turns)

            l.forEach(i => {
                if (i === l.at(-1) && task.options.end) {
                    t = cloneDeep(task)
                    t.options.runEnd = runEnd
                }

                if (this.scheduler[r + i] === undefined) {
                    this.scheduler.push([t || task])
                } else {
                    this.scheduler[r + i][c] = t || task
                }
            })
        } else {
            const l = range(task.options.turns)
            l.forEach(i => {
                if (i === l.at(-1) && task.options.end) {
                    t = cloneDeep(task)
                    t.options.runEnd = runEnd
                }

                if (this.scheduler[i] === undefined) {
                    this.scheduler.push([t || task])
                } else {
                    this.scheduler[i].push(t || task)
                }
            })
        }
    }

    async run(attacker: Entity, defender: Entity): Promise<boolean> {
        let skipTurn = false
        let queue: Task[] = []
        const copy = cloneDeep(this.scheduler)

        if (this.scheduler.length > 0) {
            const firstTasks = this.scheduler[0]

            cloneDeep(firstTasks).forEach(task => {
                if (task.options.check && task.options.check(attacker, defender)) {
                    const task = firstTasks.splice(0, 1)[0]

                    queue.push(task)
                }
            })

            if (this.scheduler[0].length === 0) {
                this.scheduler.shift()
            }

            for (const task of queue) {
                if (task.options.skipTurn) {
                    skipTurn = true
                }

                if (task.options.runEnd && this.search_all(copy, task).length === 1) {
                    task.options.runEnd()
                }
                task.options.run()
            }
        }

        return skipTurn
    }

    search(a: Task[][], x: Task): { r: number; c: number } {
        for (const r of range(a.length)) {
            for (const c of range(a[r].length)) {
                if (a[r][c].options.id === x.options.id) {
                    return { r, c }
                }
            }
        }

        return null
    }

    search_all(a: Task[][], x: Task) {
        const first = this.search(a, x)

        if (first) {
            let { r, c } = first
            const pos = [[r, c]]

            const h = a.length

            while (true) {
                if (r + 1 === h || a[r + 1][c].options.id != x.options.id) {
                    break
                }

                pos.push([r + 1, c])
                r += 1
            }

            return pos
        }
    }
}

export { Task, Scheduler }
