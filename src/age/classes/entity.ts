import { weightedBool } from '../../utils/weightedBool'
import { Scheduler, Task } from '../DuelBuilder/scheduler'
import { AttackType } from '../enums'
import { Attack } from './attack'
import { calculate } from './calculate'
import { Effect } from './effect'
import { Skill } from './skill'
import { anti_physical } from '../effects/anti-physical'
import { anti_magic } from '../effects/anti-magic'
import { illusion } from '../effects/illusion'
import { CommandInteraction } from 'discord.js'
import passive_skills from '../heroes/passive_skills'

// prettier-ignore
export type EntityProps = {
    id             : string
    name           : string
    health         : number
    attackDamage   : number
    mana           : number
    magicPower     : number
    armor          : number
    evasion        : number
    magicResistance: number
    skills         : Skill[]
    effects?       : Effect
}

export class Entity {
    id: string
    name: string
    health: number
    maxHealth: number
    attackDamage: number
    mana : number
    maxMana : number
    magicPower: number
    evasion: number
    armor: number
    magicResistance: number
    skills: Skill[]
    passive_skills: Skill[]
    effects: Effect[]

    addLogMessage: (...text: string[]) => void
    scheduler: Scheduler
    oponent: Entity

    constructor(props: EntityProps) {
        Object.assign(this, props)
        this.maxHealth = this.health
        this.maxMana = this.mana
        this.effects = []
        
    }

    equals(other: Entity) {
        return this.id === other.id
    }

    
    isDead() {
        return this.health <= 0
    }
    onDeath(interaction: CommandInteraction, killer: Entity) {
        throw new Error('Not implemented')
    }
    applyEffect(task: Task) {
        const effect = task.options.effect

        if (effect && !this.hasEffect(effect)) {
            this.effects.push(effect)
        }

        this.scheduler.add(task)
    }

    removeEffect(effect: Effect) {
        this.effects = this.effects.filter(e => e !== effect)
    }

    hasEffect(effect: Effect) {
        return this.effects.includes(effect)
    }

    removeArmor(n: number) {
        this.armor = Math.max(0, this.armor - n)
    }

     get takeDamage() {
        const thisThis = this

        const foo = {
            damage: null as number,
            type: null as AttackType,
            manacost: null as number,

            physical(damage: number) {
                this.damage = damage
                this.type = AttackType.PHYSICAL
                
                return this as typeof foo
            },

            magical(damage: number) {
                this.damage = damage
                this.type = AttackType.MAGICAL
                return this as typeof foo
            },

            run(fn: (damage: number) => string | string[] | void) {
                function ignoreAttack() {
                    notAttack = true
                }

                const attack = {
                    damage: this.damage,
                    type: this.type,
                }

                let damage = 0
                let notAttack = false

                thisThis.onReceivedAttack(attack, ignoreAttack)

                if (!notAttack) {
                    damage = calculate.damage(attack, thisThis)
                    thisThis.health = Math.max(0, thisThis.health - damage)
                    
                }

                const text = fn(damage)
                text && thisThis.addLogMessage(...(Array.isArray(text) ? text : [text]))
            },
        }

        return foo as Omit<typeof foo, 'damage' | 'type'>
    }

    useSkill(attacker:Entity,defender: Entity, skill: Skill) {
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

    beforeDuelStart(you: Entity, opponent: Entity) {
       
        
         
        
    }

    onReceivedAttack(attack: Attack, ignoreAttack: () => void) {}

    evade() {
        return weightedBool(this.evasion)
    }
}
