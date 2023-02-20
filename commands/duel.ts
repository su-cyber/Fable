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
import inventory from '../models/InventorySchema'

export default new MyCommandSlashBuilder({ name: 'duel', description: 'Duel with a player' })
    .addUserOption((option: SlashCommandUserOption) =>
        option.setName('user').setDescription('Player to duel with').setRequired(true)
    )
    .setDo(async (bot, interaction) => {
        const authorId = interaction.user.id
        const opponentId = interaction.options.getUser('user').id

        const author = await bot.users.fetch(authorId)
        const opponent = await bot.users.fetch(opponentId)

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
                                        
                                        
                                        attacker.health=foundUser.health
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicPower=foundUser.magicPower
                                attacker.attackDamage=foundUser.attackDamage
                                attacker.evasion=foundUser.evasion
                                attacker.maxHealth=foundUser.health
                                attacker.passive_skills = foundUser.passiveskills
                                attacker.maxMana = foundUser.mana
                                attacker.speed = foundUser.speed
                                
                                inventory.findOne({userID:authorId},async function(err,foundProfile) {
                                    if(foundProfile.inventory.potions.length !=0){
                                        attacker.potions = []
                                        for(let i=0;i<foundProfile.inventory.potions.length;i++){
                                            
                                            attacker.potions.push(foundProfile.inventory.potions[i].name)
                                                    }
                
                                        
                                    }
                                    else{
                                        attacker.potions =[]
                                    }
                                })
                
                               
                                    attacker.skills=foundUser.currentskills.concat([{name: 'Run',
                                    description: 'Run from the enemy',}])
                                
                                
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
                                        defender.passive_skills = foundUser.passiveskills
                                        defender.maxMana = foundUser.mana
                                        defender.speed = foundUser.speed
                                        
                                        inventory.findOne({userID:authorId},async function(err,foundProfile) {
                                            if(foundProfile.inventory.potions.length !=0){
                                                defender.potions = []
                                                for(let i=0;i<foundProfile.inventory.potions.length;i++){
                                                    
                                                    defender.potions.push(foundProfile.inventory.potions[i].name)
                                                            }
                        
                                                
                                            }
                                            else{
                                                defender.potions =[]
                                            }
                                        })
                        
                                       
                                        defender.skills=foundUser.currentskills.concat([{name: 'Run',
                                            description: 'Run from the enemy',}])
                                        
                                    }
                                })
                                if(attacker.speed>= defender.speed){
                                    await new PvPDuel({
                                        interaction,
                                        player1: attacker,
                                        player2: defender,
                                    }).start()
                                }
                                else{
                                    await new PvPDuel({
                                        interaction,
                                        player1: defender,
                                        player2: attacker,
                                    }).start()
                                }
                                
                        
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
        super.beforeDuelStart()

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
