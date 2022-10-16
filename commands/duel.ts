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
        const authorId = this.interaction.user.id
        const opponentId = this.interaction.options.getUser('user').id

        profileModel.findOne({userID:authorId},async function(err,foundUser) {
            if(err){
                console.log(err);
                
            }
            else{
                console.log("called");
                
                
                this.attacker.health=foundUser.health
                this.attacker.mana=foundUser.mana
                this.attacker.armor=foundUser.armour
                this. attacker.magicPower=foundUser.magicPower
                this. attacker.attackDamage=foundUser.attackDamage
                this. attacker.evasion=foundUser.evasion
                this. attacker.maxHealth=foundUser.health
                this. attacker.skills=foundUser.skills
                this.attacker.passive_skills = foundUser.passiveskills

                if(foundUser.weapon.length === 0){
                    this. attacker.skills=foundUser.magicskills
                }
                else{
                    
                    this. attacker.skills=foundUser.weaponskills.concat(foundUser.magicskills,foundUser.weapon[0].skills)
                }
  
            }
        })
        profileModel.findOne({userID:opponentId},async function(err,foundOpp) {
            if(err){
                console.log(err);
                
            }
            else{
                console.log("called");
                
                this.defender.health=foundOpp.health
                this.defender.mana=foundOpp.mana
                this.defender.armor=foundOpp.armour
                this.defender.magicPower=foundOpp.magicPower
                this.defender.attackDamage=foundOpp.attackDamage
                this.defender.evasion=foundOpp.evasion
                this.defender.maxHealth=foundOpp.health
                this.defender.skills=foundOpp.skills
                this.defender.passive_skills = foundOpp.passiveskills

                if(foundOpp.weapon.length === 0){
                    this.defender.skills=foundOpp.magicskills
                }
                else{
                    
                    this.defender.skills=foundOpp.weaponskills.concat(foundOpp.magicskills,foundOpp.weapon[0].skills)
                }
                
            }
        })
        if(this.attacker.passive_skills.length !=0){
            let i
            for(i=0;i<this.attacker.passive_skills.length;i++){
                const passive_skill = passive_skills.find(skill => skill.name === this.attacker.passive_skills[i].name)
                this.attacker.useSkill(this.attacker,this.defender,passive_skill)
                
                
            } 
        }
        else{

        }

        if(this.defender.passive_skills.length !=0){
            let i
            for(i=0;i<this.defender.passive_skills.length;i++){
                const passive_skill = passive_skills.find(skill => skill.name === this.defender.passive_skills[i].name)
                this.defender.useSkill(this.defender,this.attacker,passive_skill)
                
                
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
