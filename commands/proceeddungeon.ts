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
import allskills from '../src/age/skills/skills'
import passive_skills from '../src/age/heroes/passive_skills'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import specialModel from '../models/specialSchema'
import { Collector, MessageButton, MessageEmbed } from 'discord.js'
import { backBreaker } from '../src/age/items/backbreaker'
import { BeerBuccaneer2 } from '../src/age/monsters/Castellan Fields/BeerBuccaneer2'
import { PvEDuel } from './fight'
import { BeerBuccaneer1 } from '../src/age/monsters/Castellan Fields/BeerBuccaneer1'


export default new MyCommandSlashBuilder({ name: 'proceeddungeon', description: 'Move in the Dungeon' })

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
                    
        profileModel.findOne({userID:authorId},async function(err,foundUser) {
           
            const dungeon = foundUser.dungeon
            if(dungeon.status == true){
                if(dungeon.name === "Abandoned Castle"){
                    if(dungeon.step == 1){
                        let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #1')
                        .setDescription(`you found 5 bottles of backbreaker!\nBackBreaker x 5 added to inventory!`)
                        await interaction.editReply({embeds:[stepembed],components:[]})

                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name === backBreaker.name)
                                if (foundItem){
                
                                    foundItem.quantity+=5
                                }
                                else{
                                    const newItem = {
                                        name:backBreaker.name,
                                        description:backBreaker.description,
                                        quantity:Number(5)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(dungeon.step == 2){
                        
                        const attacker = Warrior.create(author)
                        const monster = BeerBuccaneer2.create()
                        await interaction.reply(`You encountered a ${monster.name}!\nStarting Combat...`)
                        await sleep(1.5)
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
                                attacker.skills=foundUser.currentskills
                        if(attacker.speed >= monster.speed){
                            await new PvEDuel({
                                interaction,
                                player1: attacker,
                                player2: monster,
                                speed:2,
                            }).start()
                            
                        }
                        else{
                            await new PvEDuel({
                                interaction,
                                player1: monster,
                                player2: attacker,
                                speed:2
                            }).start()
                        }
                    }
                    else if(dungeon.step == 3){
                        const pick = weightedRandom(["En1","En2","En3","En4","En5"],[0.5,0.2,0.2,0.09,0.01])
                        if(pick == "En1"){
                            const attacker = Warrior.create(author)
                            const monster = BeerBuccaneer1.create()
                            await interaction.reply(`You encountered a ${monster.name}!\nStarting Combat...`)
                            await sleep(1.5)
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
                                    attacker.skills=foundUser.currentskills
                            if(attacker.speed >= monster.speed){
                                await new PvEDuel({
                                    interaction,
                                    player1: attacker,
                                    player2: monster,
                                    speed:2,
                                }).start()
                                
                            }
                            else{
                                await new PvEDuel({
                                    interaction,
                                    player1: monster,
                                    player2: attacker,
                                    speed:2
                                }).start()
                            }

                        }
                        else if(pick == "En2"){

                        }
                    }
                 
                }
            }
            else{
                interaction.reply(`You are not inside a dungeon!`)
            }
        })
    }
    else{
        interaction.reply('it seems you are not awakened yet!')
    }
}
        })
    })