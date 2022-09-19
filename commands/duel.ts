import { SlashCommandUserOption } from '@discordjs/builders'
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { emoji } from '../src/lib/utils/emoji'
import { Entity } from '../src/age/classes/entity'
import { Warrior } from '../src/age/heroes/warrior'
import { Mage } from '../src/age/heroes/mage'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/heroes/skills'

export default new MyCommandSlashBuilder({ name: 'duel', description: 'Duel with a player' })
    .addUserOption((option: SlashCommandUserOption) =>
        option.setName('user').setDescription('Player to duel with').setRequired(true)
    )
    .setDo(async (bot, interaction) => {
        const authorId = interaction.user.id
        const opponentId = interaction.options.getUser('user').id

        const author = interaction.guild.members.cache.get(authorId)
        const opponent = interaction.guild.members.cache.get(opponentId)

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.exists({userID: opponentId},async function(err,result){

                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            if(result){
                                const attacker = Warrior.create(author)
                                const defender = Mage.create(opponent)
                                profileModel.findOne({userID:authorId},async function(err,foundUser) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        attacker.health=foundUser.health
                                        attacker.mana=foundUser.mana
                                        attacker.armor=foundUser.armour
                                        attacker.magicPower=foundUser.magicPower
                                        attacker.attackDamage=foundUser.attackDamage
                                        attacker.evasion=foundUser.evasion
                                        attacker.maxHealth=foundUser.health
                                        attacker.skills=foundUser.skills
                                        attacker.passive_skills = foundUser.passiveskills

                                        if(foundUser.weapon.length === 0){
                                            attacker.skills=foundUser.magicskills
                                        }
                                        else{
                                            
                                            attacker.skills=foundUser.weaponskills.concat(foundUser.magicskills,foundUser.weapon[0].skills)
                                        }
                          
                                    }
                                })
                                profileModel.findOne({userID:opponentId},async function(err,foundUser) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        defender.health=foundUser.health
                                        defender.mana=foundUser.mana
                                        defender.armor=foundUser.armour
                                        defender.magicPower=foundUser.magicPower
                                        defender.attackDamage=foundUser.attackDamage
                                        defender.evasion=foundUser.evasion
                                        defender.maxHealth=foundUser.health
                                        defender.skills=foundUser.skills
                                        defender.passive_skills = foundUser.passiveskills

                                        if(foundUser.weapon.length === 0){
                                            defender.skills=foundUser.magicskills
                                        }
                                        else{
                                            
                                            defender.skills=foundUser.weaponskills.concat(foundUser.magicskills,foundUser.weapon[0].skills)
                                        }
                                        if(foundUser.armourSuit.length === 0){

                                        }
                                        else{
                                            
                                            defender.passive_skills= foundUser.passiveskills.concat(foundUser.armourSuit[0].skills)
                                        }
                                    }
                                })
                                await new PvPDuel({
                                    interaction,
                                    player1: attacker,
                                    player2: defender,
                                }).start()
                        
                            }
                            else{
                                interaction.reply({content:"it seems that the user you selected is not an awakened yet!"})
                            }
                        }
                    })

                    
                }
                else{
                    interaction.reply({content:"it seems that you are not an awakened yet!"})
                }
            }

        })
        
        
        
        


        
    })

class PvPDuel extends DuelBuilder {
    async onTurn() {
        const p1 = this.player1
        const p2 = this.player2

        const p1EmojiEffects = [...p1.effects.values()].map(effect => effect.emoji).join(' ')
        const p2EmojiEffects = [...p2.effects.values()].map(effect => effect.emoji).join(' ')

        const content = `
            Turn: **${this.turn + 1}**

            **${p1.name}**: ${p1EmojiEffects}
            ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
            ${emoji.MANA_POTION} 100/100 MP

            **${p2.name}**: ${p2EmojiEffects}
            ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
            ${emoji.MANA_POTION} 100/100 MP

            **Attacker**: ${this.attacker.name}
        `

        //await this.replyOrEdit(removeIndentation(content), this.createDuelComponent(this.attacker.skills))

        await this.locker.wait()
        this.locker.lock()
    }

    async onEnd(winner: Entity, loser: Entity) {
        await this.interaction.channel.send(`🏆 **${winner.name}** won!`)
    }
}
