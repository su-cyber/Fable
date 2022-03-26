import cloneDeep from 'lodash.clonedeep'
import range from 'lodash.range'

import { ClassEntity } from '../classes'

// prettier-ignore
type TaskOptions = {
    check   : (attacker: ClassEntity, defender: ClassEntity) => boolean
    run     : () => Promise<void>
    end     : () => void
    runEnd  : () => Promise<void>
    skipTurn: boolean
    id      : string
    type    : 'skill' | 'effect'
    turns   : number
}

// prettier-ignore
type TaskImplement = {
    check   : (f: (attacker: ClassEntity, defender: ClassEntity) => boolean) => Task
    run     : (f: () => Promise<void>) => void
    end     : (f: () => void) => Task
    id      : (id: string) => Task
    turns   : (turns: number) => Task
    isEffect: Task
    isSkill : Task
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
            type    : undefined,
            runEnd  : undefined,
            skipTurn: false,
        }
    }

    /**
     * Check done each turn, if true the task is executed
     */
    check(f: (attacker: ClassEntity, defender: ClassEntity) => boolean) {
        this.options.check = f
        return this
    }

    /**
     * Function to be executed in the task
     */
    run(f: () => Promise<void>) {
        this.options.run = f
        this.scheduler.add(this)
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
     * Sets the id of the task
     */
    id(id: string) {
        this.options.id = id
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
    get isEffect() {
        this.options.type = 'effect'
        return this
    }

    /**
     * Sets the task as a skill
     */
    get isSkill() {
        this.options.type = 'skill'
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

    constructor() {
        this.scheduler = []
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
            await task.options.run()
            task.options.end()
        }

        if (task.options.type === 'effect' && task_exists) {
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

    async run(attacker: ClassEntity, defender: ClassEntity): Promise<boolean> {
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

                task.options.runEnd && this.search_all(copy, task).length === 1
                    ? await task.options.runEnd()
                    : await task.options.run()
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
