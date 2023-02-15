import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep, weightedRandom } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'
import { getRandomMonster } from '../src/age/monsters'
import { getRandomFlora } from '../src/age/flora'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/heroes/skills'
import passive_skills from '../src/age/heroes/passive_skills'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import specialModel from '../models/specialSchema'


export default new MyCommandSlashBuilder({ name: 'fight', description: 'fight with an encounter' })
.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const author = await bot.users.fetch(authorId)
        const guildID = interaction.guildId;
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    if(interaction.guild == null){
                        const attacker = Warrior.create(author)
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
                
                           
                                
                                
                                
                    
                
                               
                
                                
                
                                
                                 
                                    
                                    
                            if(foundUser.encounter.length != 0){
                               const timestamp = new Date()
                
                                if(foundUser.encounter[0].time.getMonth() == timestamp.getMonth()){
                                    if(foundUser.encounter[0].time.getDay() == timestamp.getDay()){
                                        if(foundUser.encounter[0].time.getHours() == timestamp.getHours()){
                                            if((timestamp.getMinutes() - foundUser.encounter[0].time.getMinutes()) < 2){
                                                if(foundUser.location == foundUser.encounter[0].location){
                                                    const monster = await (await getMonsters(foundUser.location))
                                                .find(m => m.name === foundUser.encounter[0].name)
                                                .create()
                                    
                                    if(attacker.speed >= monster.speed){
                                        await new PvEDuel({
                                            interaction,
                                            player1: attacker,
                                            player2: monster,
                                        }).start()
                                        
                                    }
                                    else{
                                        await new PvEDuel({
                                            interaction,
                                            player1: monster,
                                            player2: attacker,
                                        }).start()
                                    }
                                                }
                                                else{
                                                    interaction.reply(`you are not in ${foundUser.encounter[0].location} where you encountered ${foundUser.encounter[0].name}`)
                                                }
                                                
                                            }
                                            else{
                                                interaction.reply(`you responded too late, your encounter is lost`)
                                                const authorID = interaction.user.id
                                    profileModel.findOne({userID:authorID},async function(err,foundUser) {
                            
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            foundUser.encounter = []
                                            await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter})
                            
                                        }
                                    })
                                            }
                                        }
                                        else{
                                            interaction.reply(`you responded too late, your encounter is lost`) 
                                            const authorID = interaction.user.id
                                    profileModel.findOne({userID:authorID},async function(err,foundUser) {
                            
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            foundUser.encounter = []
                                            await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter})
                            
                                        }
                                    })
                                        }
                                    }
                                    else{
                                        interaction.reply(`you responded too late, your encounter is lost`) 
                                        const authorID = interaction.user.id
                                    profileModel.findOne({userID:authorID},async function(err,foundUser) {
                            
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            foundUser.encounter = []
                                            await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter})
                            
                                        }
                                    })
                                    }
                                }
                                else{
                                    interaction.reply(`you responded too late, your encounter is lost`)
                                    const authorID = interaction.user.id
                                    profileModel.findOne({userID:authorID},async function(err,foundUser) {
                            
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            foundUser.encounter = []
                                            await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter})
                            
                                        }
                                    })
                                }
                
                            }
                            else{
                                await interaction.reply(`you have not encountered anything!`)
                                
                                
                            }
                                        
                                        
                                    
                                
                             
                                
                                
                    
                       
                        
                        })
                
                        
                    }
                    else{
                        interaction.reply(`this command can be used only in DMs`)
                    }
                    
        
            }

            else {
                    interaction.reply({content:"it seems that you are not an awakened yet!"})
                }
            }
        })
       
    }
)

async function monstersDropdown(location:String) {
    const monsters = await getMonsters(location)

    return new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId('select-menu__monsters')
            .setPlaceholder('Select a monster')
            .addOptions(
                monsters.map(m => ({
                    label: m.name,
                    value: m.name,
                }))
            )
    )
}

class PvEDuel extends DuelBuilder {
    player1: Entity
    player2: MonsterEntity

    async beforeDuelStart() {
        super.beforeDuelStart()
        if(this.attacker instanceof MonsterEntity){
            await this.replyOrEdit({ content: `starting combat with ${this.player1.name}!` })
        }
        else{
            await this.replyOrEdit({ content: `starting combat with ${this.player2.name}!` })
        }
       
        await sleep(1.2)
        
        
    }

    async onSkillSelect(skillName: string) {
        const skill = allskills.find(skill => skill.name === skillName)

        this.attacker.useSkill(this.attacker,this.defender,skill)
    }

    
    

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

    async onEnd(winner: Entity, loser: MonsterEntity) {
       const authorID = this.interaction.user.id
        profileModel.findOne({userID:authorID},async function(err,foundUser) {
            
            if(err){
                console.log(err);
                
            }
            else{
                foundUser.encounter = []
                await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter})

            }
        })
        await loser.onDeath(this.interaction, winner)
    }

    
}


class PvEDuel_Quest extends PvEDuel {
    player1: Entity
    player2: MonsterEntity

    
    async onEnd(winner: Entity, loser: MonsterEntity) {
        const authorId = this.interaction.user.id
        profileModel.findOne({userID:authorId},async function(err,foundUser){
        if(winner.name != foundUser.quest_mob){
            
            
                const finalValue = foundUser.quest_quantity - 1
                await profileModel.updateOne({userID:authorId},{quest_quantity: finalValue})
                if(finalValue === 0){
                    
                    await profileModel.updateOne({userID:authorId},{quest: false})
                }

           
            
        }
    })
        await loser.onDeath(this.interaction, winner)
        
    }

}