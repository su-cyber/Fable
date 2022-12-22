import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep, weightedRandom } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'
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


export default new MyCommandSlashBuilder({ name: 'explore', description: 'Explore the world' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('location').setDescription('location to explore').setRequired(true)
    )
.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const location = interaction.options.getString('location').toLowerCase()
        const author = interaction.guild.members.cache.get(authorId)
        const guildID = interaction.guildId;
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    const attacker = Warrior.create(author)
        profileModel.findOne({userID:authorId},async function(err,foundUser) {
            var userQuestLocation = foundUser.quest_location.toLowerCase()
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

                if(foundUser.weapon.length === 0){
                    attacker.skills=foundUser.magicskills
                }
                else{
                    
                    attacker.skills=foundUser.weaponskills.concat(foundUser.magicskills,foundUser.weapon[0].skills)
                }

                
                
                
            }

            if(location === "ellior"){
                await interaction.deferReply()
                await interaction.editReply({ content: `searching ${location}...`})

                const pick = weightedRandom(["flora","monster","spren"],[0.1,0.8,0.1])

                if(pick === "flora"){
                    await interaction.editReply({ content: '\u200b', components: [] })
                    const flora = (await getRandomFlora())
                    await interaction.editReply(`you found a ${flora.name}\n${flora.name} added to inventory!`)

                    inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            const foundItem = foundUser.inventory.items.find(item => item.name === flora.name)
                            if (foundItem){
            
                                foundItem.quantity+=1
                            }
                            else{
                                const newItem = {
                                    name:flora.name,
                                    description:flora.description,
                                    quantity:Number(1)
                                }
                                foundUser.inventory.items.push(newItem)
                            }
                            await inventory.updateOne({userID:authorId},foundUser)
                        }
                        
                    })
                }

                else if(pick === "monster"){
                    await interaction.followUp({ components: [await monstersDropdown()],ephemeral:true})
         
                    bot.onComponent('select-menu__monsters', async componentInteraction => {
                        componentInteraction.deferUpdate()
                        await interaction.editReply({ content: '\u200b', components: [] })
                        const monster = (await getMonsters())
                            .find(m => m.name === componentInteraction.values[0])
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
                        
                    })
                }
                else if(pick === "spren"){
                    const spren = weightedRandom(["fireSpren","windSpren","waterSpren"],[0.3,0.4,0.3])
                    specialModel.exists({Spren:spren},async function(err,res){
                        if(res){
                            specialModel.findOne({Spren:spren},async function(err,found){
                                interaction.editReply(`${spren} has already been claimed in the world\nclaimed by: ${found.owner}`)
                            })
                            
                        }
                        else{
                                specialModel.exists({userID:authorId},async function(err,res){
                                    if(res){
                                        interaction.editReply(`you already possess a spren!`)
                                    }
                                    else{
                                        interaction.editReply(`congrats! you found a ${spren}`)
                                        let special = await new specialModel({
                                            userID: authorId,
                                            serverID: guildID,
                                            Spren: spren,
                                            owner: interaction.user.username
                                            
                                        })
                                        special.save();
                                    }

                                })
                                   
                               
                          
                        }
                    })
                }
                }
                
    
            else if(location === userQuestLocation){
                profileModel.findOne({userID:authorId},async function (err,foundUser){
                    if(foundUser.quest_quantity !=0){
                        const monster = (await getMonsters())
                        .find(m => m.name === foundUser.quest_mob)
                        .create()
        
                
                        if(attacker.speed >= monster.speed){
                            await new PvEDuel_Quest({
                                interaction,
                                player1: attacker,
                                player2: monster,
                            }).start()
                        }
                        else{
                            await new PvEDuel_Quest({
                                interaction,
                                player1: monster,
                                player2: attacker,
                            }).start()
                        }
                        
                }
                else{
                    await interaction.deferReply()
                    await interaction.editReply(`You have no active quest!`)
                }
                })
                
    
            }
            else{
                await interaction.deferReply()
                await interaction.editReply(`cannot access ${location}`)
            }
         
        })

        
        
            }

            else {
                    interaction.reply({content:"it seems that you are not an awakened yet!"})
                }
            }
        })
       
    }
)

async function monstersDropdown() {
    const monsters = await getMonsters()

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
            await this.replyOrEdit({ content: `🔎 Found a ${this.player1.name}!` })
        }
        else{
            await this.replyOrEdit({ content: `🔎 Found a ${this.player2.name}!` })
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