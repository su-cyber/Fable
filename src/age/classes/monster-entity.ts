import { CommandInteraction } from 'discord.js'
import sample from 'lodash.sample'
import { nanoid } from 'nanoid'
import { Dropper } from '../dropper'
import { Entity, EntityProps } from './entity'
import { Skill } from './skill'

export class MonsterEntity extends Entity {
    spawnRate: number
    dropper: Dropper
    lastSkill: Skill

    constructor(
        props: Omit<EntityProps, 'id'> & {
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

        if (skill.canEvade && this.oponent.evade()) {
            return this.addLogMessage(`**${this.name}** used ${skill.name} but ${this.oponent.name} evaded`)
        }

        const text = skill.use(this, defender)

        if (text) {
            this.addLogMessage(...(Array.isArray(text) ? text : [text]))
        }
    }

    async onDeath(interaction: CommandInteraction, killer: Entity) {
        throw new Error('Not implemented')
    }

    static create() {
        throw new Error('Not implemented')
    }
}
