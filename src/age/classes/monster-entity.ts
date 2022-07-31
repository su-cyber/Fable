import { CommandInteraction } from 'discord.js'
import sample from 'lodash.sample'
import { nanoid } from 'nanoid'
import { Dropper } from '../dropper'
import { Entity, EntityProps } from './entity'
import { Skill } from './skill'
import { anti_physical } from '../effects/anti-physical'
import { anti_magic } from '../effects/anti-magic'
import { illusion } from '../effects/illusion'

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

    useSkill(attacker:Entity,defender: Entity) {
        const skill = this.chooseSkill(defender)
        if(attacker.mana>=skill.mana_cost){
            attacker.mana=attacker.mana-skill.mana_cost
            if (skill.canEvade && this.oponent.evade()) {
                return this.addLogMessage(`**${this.name}** used ${skill.name} but ${this.oponent.name} evaded`)
            }
            else{
    
            }
            if(attacker.hasEffect(anti_physical)){
                if(skill.type!='physical'){
                    const text = skill.use(this, defender)
                    if (text) {
                        this.addLogMessage(...(Array.isArray(text) ? text : [text]))
                }
            }
                else{
                    attacker.addLogMessage('physical attacks have been disabled!')
                }
            }
            else if(attacker.hasEffect(anti_magic)){
                if(skill.type!='magical'){
                    const text = skill.use(this, defender)
                    if (text) {
                        this.addLogMessage(...(Array.isArray(text) ? text : [text]))
                }
            }
                else{
                    attacker.addLogMessage('magical attacks have been disabled!')
                }
            }
            else if(attacker.hasEffect(illusion)){
                attacker.addLogMessage("You are under illusion!")
                    const text = skill.use(this, attacker)
                    if (text) {
                        this.addLogMessage(...(Array.isArray(text) ? text : [text]))
                
            }
                
            }
            else {
                const text = skill.use(this, defender)
                    if (text) {
                        this.addLogMessage(...(Array.isArray(text) ? text : [text]))
            }
        }
            }
            else{
                attacker.addLogMessage("Insufficient mana! Attack failed!")
            }
        
    }

    async onDeath(interaction: CommandInteraction, killer: Entity) {
        throw new Error('Not implemented')
    }

    static create() {
        throw new Error('Not implemented')
    }
}
