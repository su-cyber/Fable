
import { blind } from "../effects/blind"
import { paralyzed } from "../effects/paralyze"
import lvl_modifier from "../../utils/lvl_modifier"
const dragoon_tree=[
    {
        name: 'Piercing Shot',
        cooldown: 0,
        description: `Harness your weapon's power to project a shot that defies armor, piercing through even the sturdiest defenses with relentless precision.`,
        canEvade: true,
        mana_cost: 0,
        damage:15,
        element:"normal",
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Piercing Shot`)
            defender.takeDamage
                .magical(attacker.magicPower*15*lvl_modifier(attacker.level))
                .run(damage => `${defender.name} lost ${damage} HP by a precise shot bypassing all defenses`)
        }
    },{
        name: 'Rapid Volley',
        cooldown: 0,
        description: 'Unleash a rapid succession of projectiles, turning the battlefield into a storm of devastation, leaving your foes struggling to dodge the onslaught.',
        canEvade: true,
        mana_cost:5,
        damage:35,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `${attacker.name} used Rapid Volley`
            )
            defender.takeDamage
            .magical(attacker.magicPower*35*lvl_modifier(attacker.level))
            .run(damage => `${defender.name} lost ${damage} HP by a rapid onslaught of arcane projectiles`)
        }
    },{
        name: 'Paralyzing Bolt',
        cooldown: 0,
        description: `Releasing a bolt infused with paralytic force, seizing your enemy's movements and rendering them helpless.`,
        canEvade: true,
        mana_cost: 3,
        damage:0,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{
            
            const _paralyzed = attacker.scheduler.task
                            .id('dragoon__paralyticshot')
                            .turnOf(defender)
                            .skipTurn.effect(paralyzed)
                            .turns(2)
                            .end(() => defender.removeEffect(paralyzed))
                            .run(() => { attacker.addLogMessage(`${defender.name} cannot attack due to being paralyzed`)})

                        defender.applyEffect(_paralyzed)
                        defender.addLogMessage(
                            `${attacker.name} used Paralyzing Bolt`,
                            `${defender.name} has been shot with a paralytic bolt paralyzing them for 2 turns`
                        )

              }
    },{
        name: `True Strike`,
        cooldown: 0,
        description: `Execute a lightning-fast strike with surgical precision, circumventing the enemy's defenses and delivering a blow that shakes their very foundation.`,
        canEvade: true,
        mana_cost: 8,
        damage:50,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used True Strike`)
            defender.takeDamage
                .magical(attacker.magicPower*50*lvl_modifier(attacker.level))
                .run(damage => `${defender.name} lost ${damage} HP by a lightning fast shot to their vitals with deadly precision`)
        }
    },{
        cooldown: 0,
        name: `Blinding Flash`,
        description: `Ignite a radiant burst of light, blinding your foe and shrouding them in disorientation, leaving them vulnerable and struggling to perceive their surroundings.`,
        canEvade: false,
        type: 'buff',
        damage:0,
        element:"normal",
        mana_cost: 6,
        use: (attacker, defender) => {
            const blindingflash = attacker.scheduler.task
                            .id('dragoon_blind')
                            .all.effect(blind)
                            .turns(4)
                            .end(() => {
                                defender.removeEffect(blind)
                                defender.removeEffect(blindingflash)
                            })
                            .run(() =>
                            {}
                            )

                        defender.applyEffect(blindingflash)
                        attacker.addLogMessage(`${attacker.name} used Blinding Flash`,
                        `${attacker.name} Ignited a radiant burst of light blinding ${defender.name}`
                        )
           
        },
    },{
        name: 'Burst Mode',
        cooldown: 0,
        description: 'Harness the untamed energies within, empowering your projectiles with a surging burst that erupts upon impact, wreaking havoc on your enemy.',
        canEvade: true,
        mana_cost:12,
        damage:70,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `${attacker.name} used Burst Mode`
            )
            defender.takeDamage
            .magical(attacker.magicPower*70*lvl_modifier(attacker.level))
            .run(damage => `${attacker.name} Harnessess the untamed energies within, empowering their projectiles with a surging burst that erupts upon impact, wreaking havoc on ${defender.name} causing ${damage} dmg.`)
        }
    },{
        name: 'Rain of Doom',
        cooldown: 0,
        description: 'Engage in a relentless onslaught, unleashing an overwhelming barrage of projectiles that paints the battlefield in a tapestry of destruction, leaving your enemies shattered and defeated.',
        canEvade: true,
        mana_cost:15,
        damage:85,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `${attacker.name} used Rain of Doom`
            )
            defender.takeDamage
            .magical(attacker.magicPower*85*lvl_modifier(attacker.level))
            .run(damage => `${attacker.name} unleashes an overwhelming barrage of projectiles that paints the battlefield in a tapestry of destruction causing ${damage} dmg on ${defender.name}`)
        }
    },
]

export default dragoon_tree