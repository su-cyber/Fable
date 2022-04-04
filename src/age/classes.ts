import { CommandInteraction, GuildMember } from 'discord.js'
import sample from 'lodash.sample'
import { nanoid } from 'nanoid'
import { weightedBool } from '../utils/weightedBool'
import { Dropper } from './dropper'
import { Scheduler } from './DuelBuilder/scheduler'
import { AttackType } from './enums'

type EntityAttrs = {
    id: string
    name: string
    health: number
    attackDamage: number
    magicPower: number
    armor: number
    evasion: number
    magicResistance: number
    skills: Skill[]
    effects?: Effect
}

type Skill = {
    name: string
    description: string
    cooldown: number
    use: (attacker: Entity, defender: Entity) => void
}

export type Attack = {
    damage: number
    type: AttackType
    canEvade?: boolean
}

class Entity {
    id: string
    name: string
    health: number
    maxHealth: number
    attackDamage: number
    magicPower: number
    evasion: number
    armor: number
    magicResistance: number
    skills: Skill[]
    effects: Effect[]

    addLogMessage: (...text: string[]) => void
    scheduler: Scheduler

    constructor(props: EntityAttrs) {
        Object.assign(this, props)
        this.maxHealth = this.health
        this.effects = []
    }

    equals(other: Entity) {
        return this.id === other.id
    }

    isDead() {
        return this.health <= 0
    }

    applyEffect(effect: Effect) {
        if (!this.hasEffect(effect)) {
            this.effects.push(effect)
        }
    }

    removeEffect(effect: Effect) {
        this.effects = this.effects.filter(e => e !== effect)
    }

    hasEffect(effect: Effect) {
        return this.effects.includes(effect)
    }

    takeDamage(attack: Attack) {
        function ignoreAttack() {
            notAttack = true
        }

        const evade = attack.canEvade === undefined ? true : false
        const evaded = evade && this.evade()
        let damage = 0
        let notAttack = false

        if (evaded) {
            this.addLogMessage(`**${this.name}** evaded the attack`)
        } else {
            this.onReceivedAttack(attack, ignoreAttack)

            if (!notAttack) {
                damage = calculate.damage(attack, this)
                this.health = Math.max(0, this.health - damage)
            }
        }

        return {
            send: (...f: string[] | ((damage: number) => string | string[])[]) => {
                if (notAttack) {
                    return
                }

                if (!evaded) {
                    if (typeof f[0] === 'function') {
                        const text = f[0](damage)
                        this.addLogMessage(...(Array.isArray(text) ? text : [text]))
                    } else {
                        this.addLogMessage(...(f as string[]))
                    }
                } else {
                    this.addLogMessage(`**${this.name}** evaded the attack`)
                }
            },
        }
    }

    useSkill(defender: Entity, skill: Skill) {
        skill.use(this, defender)
    }

    beforeDuelStart(you: Entity, opponent: Entity) {}

    onReceivedAttack(attack: Attack, ignoreAttack: () => void) {}

    evade() {
        return weightedBool(this.evasion)
    }
}

class MonsterEntity extends Entity {
    spawnRate: number
    dropper: Dropper
    lastSkill: Skill

    constructor(
        props: Omit<EntityAttrs, 'id'> & {
            spawnRate: number
        }
    ) {
        const { spawnRate, ...rest } = props
        super({ id: nanoid(), ...rest })
        this.spawnRate = spawnRate
        this.lastSkill = null
    }

    chooseSkill(defender: Entity) {
        const skill = sample(this.skills)
        this.lastSkill = skill
        return skill
    }

    useSkill(defender: Entity) {
        const skill = this.chooseSkill(defender)

        skill.use(this, defender)
    }

    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        throw new Error('Not implemented')
    }

    static create() {
        throw new Error('Not implemented')
    }
}

class ClassEntity extends Entity {
    constructor({ user, ...rest }: Omit<EntityAttrs, 'id' | 'name'> & { user: GuildMember }) {
        super({ id: user.id, name: user.user.username, ...rest })
    }

    static create(user: GuildMember) {
        throw new Error('Not implemented')
    }
}

class Effect {
    emoji: string

    constructor(props: { emoji: string }) {
        Object.assign(this, props)
    }
}

const calculate = {
    physicalDamage: (damage: number, armor: number): number => {
        return damage * (100 / (100 + armor))
    },
    magicDamage: (damage: number, resistance: number): number => {
        return damage * (100 / (100 + resistance))
    },

    damage: (attack: Attack, defender: Entity): number => {
        return Math.round(
            attack.type === AttackType.PHYSICAL
                ? calculate.physicalDamage(attack.damage, defender.armor)
                : calculate.magicDamage(attack.damage, defender.magicResistance)
        )
    },
}

export { Skill, Entity, ClassEntity, Effect, MonsterEntity }
