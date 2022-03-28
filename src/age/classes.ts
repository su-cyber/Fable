import { CommandInteraction, GuildMember } from 'discord.js'
import sample from 'lodash.sample'
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
    magicResistance: number
    skills: Skill[]
    effects: Set<Effect>
}

type TypeSkill = {
    name: string
    description: string
    cooldown: number
    use: (
        sendInfoMessage: (text: string) => Promise<void>,
        scheduler: Scheduler,
        attacker: Entity,
        defender: Entity
    ) => void
}

type TypeEffect = {
    name: string
    description: string
    duration: number
    stacks: number
    emoji: string
}

class Entity {
    id: string
    name: string
    health: number
    maxHealth: number
    attackDamage: number
    magicPower: number
    armor: number
    magicResistance: number
    skills: Skill[]
    effects: Set<Effect>

    constructor(props: EntityAttrs) {
        Object.assign(this, props)
        this.maxHealth = this.health
    }

    isDead() {
        return this.health <= 0
    }

    applyEffect(effect: Effect) {
        this.effects.add(effect)
    }

    removeEffect(effect: Effect) {
        this.effects.delete(effect)
    }

    hasEffect(effect: Effect) {
        return this.effects.has(effect)
    }

    takeDamage(attack: Attack) {
        const damage = calculate.damage(attack, this)
        this.health = Math.max(0, this.health - damage)
        return damage
    }

    useSkill(
        sendInfoMessage: (text: string) => Promise<void>,
        scheduler: Scheduler,
        defender: Entity,
        skill: Skill
    ) {
        skill.use(sendInfoMessage, scheduler, this, defender)
    }
}

class MonsterEntity extends Entity {
    spawnRate: number
    drops: Dropper

    constructor(
        props: EntityAttrs & {
            spawnRate: number
            drops: Dropper
        }
    ) {
        const { spawnRate, drops, ...rest } = props
        super(rest)
        this.spawnRate = spawnRate
        this.drops = drops
    }

    useSkill(sendInfoMessage: (text: string) => Promise<void>, scheduler: Scheduler, defender: Entity) {
        const skill = sample(this.skills)

        skill.use(sendInfoMessage, scheduler, this, defender)
    }

    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        throw new Error('Not implemented')
    }

    static create() {
        throw new Error('Not implemented')
    }
}

class ClassEntity extends Entity {
    static create(user: GuildMember) {
        throw new Error('Not implemented')
    }
}

class Skill {
    public name: string
    public description: string
    public cooldown: number
    public use: (
        sendInfoMessage: (text: string) => Promise<void>,
        scheduler: Scheduler,
        attacker: Entity,
        defender: Entity
    ) => void

    constructor(props: TypeSkill) {
        Object.assign(this, props)
    }
}

class Effect {
    name: string
    description: string
    duration: number
    stacks: number
    emoji: string

    constructor(props: TypeEffect) {
        Object.assign(this, props)
    }

    use(attacker: Entity, defender: Entity) {
        throw new Error('Not implemented')
    }

    setUse(fn: (attacker: Entity, defender: Entity) => void) {
        this.use = fn
        return this
    }
    
    setDuration(duration: number) {
        this.duration = duration
        return this
    }
}

class Attack {
    constructor(public damage: number, public attackType: AttackType) {}
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
            attack.attackType === AttackType.PHYSICAL
                ? calculate.physicalDamage(attack.damage, defender.armor)
                : calculate.magicDamage(attack.damage, defender.magicResistance)
        )
    },
}

function skill(props: TypeSkill) {
    return new Skill(props)
}

export { Skill, Entity, ClassEntity, Effect, MonsterEntity, skill }
