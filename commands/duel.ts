import { SlashCommandUserOption } from '@discordjs/builders'
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { emoji } from '../src/lib/utils/emoji'
import { MonsterEntity, Entity } from '../src/age/classes'
import { Warrior } from '../src/age/heroes/warrior'
import { Mage } from '../src/age/heroes/mage'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/heroes/skills'
import { sleep } from '../src/utils'
import passive_skills from '../src/age/heroes/passive_skills'

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
                                const defender = Warrior.create(opponent)
                                profileModel.findOne({userID:authorId},async function(err,foundUser) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        console.log("called");
                                        
                                        
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
                                profileModel.findOne({userID:opponentId},async function(err,foundOpp) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        console.log("called");
                                        
                                        defender.health=foundOpp.health
                                        defender.mana=foundOpp.mana
                                        defender.armor=foundOpp.armour
                                        defender.magicPower=foundOpp.magicPower
                                        defender.attackDamage=foundOpp.attackDamage
                                        defender.evasion=foundOpp.evasion
                                        defender.maxHealth=foundOpp.health
                                        defender.skills=foundOpp.skills
                                        defender.passive_skills = foundOpp.passiveskills

                                        if(foundOpp.weapon.length === 0){
                                            defender.skills=foundOpp.magicskills
                                        }
                                        else{
                                            
                                            defender.skills=foundOpp.weaponskills.concat(foundOpp.magicskills,foundOpp.weapon[0].skills)
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
    player1: Entity
    player2: Entity

    async onTurn(skipTurn: boolean) {
        const isMonsterTurn = this.attacker instanceof MonsterEntity

        if (skipTurn) {
            if (isMonsterTurn) {
                await sleep(1.5)
                this.deleteInfoMessages()
            }

            return
        }

        if (this.attacker instanceof MonsterEntity) {
            
           
            await this.sendInfoMessage(this.attacker.skills, true)

            this.attacker.useSkill(this.attacker,this.defender)
            
            
        } else {
            
            await this.sendInfoMessage(this.attacker.skills)
            await sleep(1.5)
            this.deleteInfoMessages()
            await this.locker.wait()
            this.locker.lock()
        }

        await this.sendInfoMessage(this.attacker.skills)
        
    }

    async beforeDuelStart() {
        
        
        if(this.player1.passive_skills.length !=0){
            let i
            for(i=0;i<this.player1.passive_skills.length;i++){
                const passive_skill = passive_skills.find(skill => skill.name === this.player1.passive_skills[i].name)
                this.player1.useSkill(this.player1,this.player2,passive_skill)
                
                
            } 
        }
        else{

        }

        if(this.player2.passive_skills.length !=0){
            let i
            for(i=0;i<this.player2.passive_skills.length;i++){
                const passive_skill = passive_skills.find(skill => skill.name === this.player2.passive_skills[i].name)
                this.player2.useSkill(this.player2,this.player1,passive_skill)
                
                
            } 
        }
        else{

        }
        
        await this.replyOrEdit({ content: `initiating duel with ${this.player2.name}!` })
        await sleep(1.2)
        
        
    }
    async onSkillSelect(skillName: string) {
        const skill = allskills.find(skill => skill.name === skillName)

        this.attacker.useSkill(this.attacker,this.defender,skill)
    }

    async onEnd(winner: Entity, loser: Entity) {
        await this.interaction.channel.send(`🏆 **${winner.name}** won!`)
    }
}
