import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/skills/skills'
import passive_skills from '../src/age/heroes/allPassives'
import inventory from '../models/InventorySchema'
import sample from 'lodash.sample'
import { SlashCommandIntegerOption} from '@discordjs/builders'
import getHealth from '../src/utils/getHealth'
import { Client, Interaction, MessageEmbed } from 'discord.js'
import { calculate } from '../src/age/classes'
import hunting_contracts from '../src/utils/allHuntingContracts'
import { Bot } from '../src/bot'
import { emoji } from '../src/lib/utils/emoji'
import { PvEDuel } from './fight'
import { getEmoji } from './fight'

export default new MyCommandSlashBuilder({ name: 'Test-fight', description: 'fight with an encounter' })
.addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName('speed')
            .setDescription('set speed of simulation:1x,2x,4x')
            .setRequired(true)
            .addChoice('1x',3)
            .addChoice('2x',2)
            .addChoice('4x',1)
)
.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        var author = await bot.users.fetch(authorId)
        const setspeed = interaction.options.getInteger('speed')
        
        
        
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    
                        profileModel.findOne({userID:authorId},async function(err,foundUser){
                            if(foundUser.energy <= 0){
                                interaction.reply({content:`You cannot move as you dont have any energy left!You can view your current energy in your Keystone Grimoire and you regain 1 energy every 1 hour in real-time.Every battle costs 1 energy and energy is needed to move inside dungeons but is only spent if you engage in a battle`,ephemeral:true})
                                foundUser.encounter = []
                                await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                            }
                            else{
                                const attacker = await Warrior.create(author)
                                attacker.health=foundUser.health
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicResistance = foundUser.magicResistance
                                attacker.magicPower=foundUser.magicPower
                                attacker.attackDamage=foundUser.attackDamage
                                attacker.element = foundUser.elements[0].toLowerCase();
                                attacker.evasion=foundUser.evasion
                                attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                attacker.passive_skills = foundUser.innate_passive.concat(foundUser.passiveskills)
                                attacker.maxMana = foundUser.mana
                                attacker.speed = foundUser.speed
                                attacker.level = foundUser.level
                                attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                
                               
                                    attacker.skills=foundUser.currentskills
                                
                                    attacker.element = attacker.element.toLowerCase()
                                    
                                   
                                
                
                                
                                
                                
                            
                
                           
                                
                                
                                
                    
                
                               
                
                                
                
                                
                                 
                                    
                                    
                            if(foundUser.encounter.length != 0){
                               if(foundUser.location == "tutorial"){
                                if(foundUser.location == foundUser.encounter[0].location || foundUser.city_town == foundUser.encounter[0].location){
                                    const monster = await (await getMonsters(foundUser.location))
                                .find(m => m.name === foundUser.encounter[0].name)
                                .create()
                    
                        let i
                        for(i=0;i<3;i++){
                            if(attacker.speed >= monster.speed){
                        
                                await new PvEDuel({
                                    interaction,
                                    player1: attacker,
                                    player2: monster,
                                    speed:setspeed,
                                }).start()
                                
                            }
                            else{
                                await new PvEDuel({
                                    interaction,
                                    player1: monster,
                                    player2: attacker,
                                    speed:setspeed
                                }).start()
                            }
                        }
                    
                                }
                                else{
                                    interaction.reply({content:`you are not in ${foundUser.encounter[0].location} where you encountered ${foundUser.encounter[0].name}`,ephemeral:true})
                                }
                               }
                               else{
                                const timestamp = Date.now()
                
                                if(timestamp - foundUser.encounter[0].time <= 2*60*1000){
                                    if(foundUser.location == foundUser.encounter[0].location || foundUser.city_town == foundUser.encounter[0].location){
                                        const monster = await (await getMonsters(foundUser.encounter[0].location)).map(fn => fn.create())
                                    .find(m => m.name === foundUser.encounter[0].name)
                                    
                                    
                            foundUser.encounter = []
                            await profileModel.updateOne({userID:interaction.user.id},{encounter:foundUser.encounter})
                            let i
                            for(i=0;i<3;i++){
                                if(attacker.speed >= monster.speed){
                            
                                    await new PvEDuel({
                                        interaction,
                                        player1: attacker,
                                        player2: monster,
                                        speed:setspeed,
                                    }).start()
                                    
                                }
                                else{
                                    await new PvEDuel({
                                        interaction,
                                        player1: monster,
                                        player2: attacker,
                                        speed:setspeed
                                    }).start()
                                }
                            }
                                    }
                                    else{
                                        interaction.reply(`you are not in ${foundUser.encounter[0].location} where you encountered ${foundUser.encounter[0].name}`)
                                    }
                                }
                                else{
                                    interaction.reply({content:`you responded too late, your encounter is lost`,ephemeral:true})
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
                
                            }
                            else{
                                await interaction.reply({content:`you have not encountered anything!`,ephemeral:true})
                                
                                
                            }
                                        
                                        
                                    
                                
                             
                                
                                
                    
                       
                        
                        
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

