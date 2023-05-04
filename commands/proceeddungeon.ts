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
import { crookcutlass } from '../src/age/weapons/crook\'scutlass'
import getHealth from '../src/utils/getHealth'
import { captainCrook } from '../src/age/Dungeon-Boss/captainCrook'


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
                        await interaction.reply({embeds:[stepembed],components:[]})

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
                                dungeon.step+=1
                                await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                            }
                            
                        })
                    }
                    else if(dungeon.step == 2){
                        
                        const attacker = Warrior.create(author)
                        const monster = BeerBuccaneer2.create()
                        await interaction.reply(`You encountered a ${monster.name}!`)
                        await sleep(1.5)
                                attacker.health=foundUser.health
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicPower=foundUser.magicPower
                                attacker.attackDamage=foundUser.attackDamage
                                attacker.evasion=foundUser.evasion
                                attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                attacker.element = foundUser.elements[0]
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
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                    }
                    else if(dungeon.step == 3){
                        const pick = weightedRandom(["En1","En2","En3","En4","En5"],[0.5,0.2,0.2,0.09,0.01])
                        if(pick == "En1"){
                            const attacker = Warrior.create(author)
                            const monster = BeerBuccaneer1.create()
                            await interaction.reply(`You encountered a ${monster.name}!`)
                            await sleep(1.5)
                            attacker.health=foundUser.health
                                    attacker.mana=foundUser.mana
                                    attacker.armor=foundUser.armour
                                    attacker.magicPower=foundUser.magicPower
                                    attacker.attackDamage=foundUser.attackDamage
                                    attacker.evasion=foundUser.evasion
                                    attacker.element = foundUser.elements[0]
                                    attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
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
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En2"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #3')
                        .setDescription(`you stepped into a room with Broken Glass!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En3"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #3')
                        .setDescription(`you stepped into a Slippery Floor!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En4"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #3')
                        .setDescription(`you found a stash of Money!\nYou recieved 1000 coins!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{coins:foundUser.coins+1000})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})

                      
                        }
                        else if(pick == "En5"){
                            let stepembed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('STEP #3')
                            .setDescription(`you found yourself wandering into the weapon room!\nCapn. Crook's Cutlass x 1 added to inventory!`)
                            await interaction.reply({embeds:[stepembed],components:[]})
    
                            inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                                if(err){
                                    console.log(err);
                                    
                                }
                                else{
                                    const foundItem = foundUser.inventory.weapons.find(item => item.name.name === crookcutlass.name)
                                    if (foundItem){
                    
                                        foundItem.quantity+=1
                                    }
                                    else{
                                        const newItem = {
                                            name:crookcutlass,
                                            description:crookcutlass.description,
                                            quantity:Number(1)
                                        }
                                        foundUser.inventory.weapons.push(newItem)
                                    }
                                    await inventory.updateOne({userID:authorId},foundUser)
                                }
                                
                            })
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        
                        
                    }
                    else if(dungeon.step == 4){
                        let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #4')
                        .setDescription(`you walked into a hamock room!\nYou recovered 50% HP!`)
                        let health
                        if(foundUser.health + 0.5*foundUser.health > getHealth(foundUser.level,foundUser.vitality)){
                            health = getHealth(foundUser.level,foundUser.vitality)
                        }
                        else{
                            health = Math.round(foundUser.health + 0.5*foundUser.health)
                        }
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:health})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})

                    }
                    else if(dungeon.step == 5){
                        
                        const attacker = Warrior.create(author)
                        const monster = BeerBuccaneer2.create()
                        await interaction.reply(`You encountered a ${monster.name}!`)
                        await sleep(1.5)
                        attacker.health=foundUser.health
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicPower=foundUser.magicPower
                                attacker.attackDamage=foundUser.attackDamage
                                attacker.evasion=foundUser.evasion
                                attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                attacker.element = foundUser.elements[0]
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
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                    }
                    else if(dungeon.step == 6){
                        const pick = weightedRandom(["En1","En2","En3","En4","En5"],[0.5,0.2,0.2,0.09,0.01])
                        if(pick == "En1"){
                            const attacker = Warrior.create(author)
                            const monster = BeerBuccaneer1.create()
                            await interaction.reply(`You encountered a ${monster.name}!`)
                            await sleep(1.5)
                            attacker.health=foundUser.health
                                    attacker.mana=foundUser.mana
                                    attacker.armor=foundUser.armour
                                    attacker.magicPower=foundUser.magicPower
                                    attacker.attackDamage=foundUser.attackDamage
                                    attacker.evasion=foundUser.evasion
                                    attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                    attacker.element = foundUser.elements[0]
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
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En2"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #6')
                        .setDescription(`you stepped into a room with Broken Glass!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En3"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #6')
                        .setDescription(`you stepped into a Slippery Floor!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En4"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #6')
                        .setDescription(`you found a stash of Money!\nYou recieved 1000 coins!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{coins:foundUser.coins+1000})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})

                      
                        }
                        else if(pick == "En5"){
                            let stepembed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('STEP #6')
                            .setDescription(`you found yourself wandering into the weapon room!\nCapn. Crook's Cutlass x 1 added to inventory!`)
                            await interaction.reply({embeds:[stepembed],components:[]})
    
                            inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                                if(err){
                                    console.log(err);
                                    
                                }
                                else{
                                    const foundItem = foundUser.inventory.weapons.find(item => item.name.name === crookcutlass.name)
                                    if (foundItem){
                    
                                        foundItem.quantity+=1
                                    }
                                    else{
                                        const newItem = {
                                            name:crookcutlass,
                                            description:crookcutlass.description,
                                            quantity:Number(1)
                                        }
                                        foundUser.inventory.weapons.push(newItem)
                                    }
                                    await inventory.updateOne({userID:authorId},foundUser)
                                }
                                
                            })
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        
                        
                    }
                    else if(dungeon.step == 7){
                        const pick = weightedRandom(["En1","En2","En3","En4","En5"],[0.5,0.2,0.2,0.09,0.01])
                        if(pick == "En1"){
                            const attacker = Warrior.create(author)
                            const monster = BeerBuccaneer1.create()
                            await interaction.reply(`You encountered a ${monster.name}!`)
                            await sleep(1.5)
                            attacker.health=foundUser.health
                                    attacker.mana=foundUser.mana
                                    attacker.armor=foundUser.armour
                                    attacker.magicPower=foundUser.magicPower
                                    attacker.attackDamage=foundUser.attackDamage
                                    attacker.evasion=foundUser.evasion
                                    attacker.element = foundUser.elements[0]
                                    attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
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
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En2"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #7')
                        .setDescription(`you stepped into a room with Broken Glass!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En3"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #3')
                        .setDescription(`you stepped into a Slippery Floor!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En4"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #7')
                        .setDescription(`you found a stash of Money!\nYou recieved 1000 coins!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{coins:foundUser.coins+1000})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                      
                        }
                        else if(pick == "En5"){
                            let stepembed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('STEP #7')
                            .setDescription(`you found yourself wandering into the weapon room!\nCapn. Crook's Cutlass x 1 added to inventory!`)
                            await interaction.reply({embeds:[stepembed],components:[]})
    
                            inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                                if(err){
                                    console.log(err);
                                    
                                }
                                else{
                                    const foundItem = foundUser.inventory.weapons.find(item => item.name.name === crookcutlass.name)
                                    if (foundItem){
                    
                                        foundItem.quantity+=1
                                    }
                                    else{
                                        const newItem = {
                                            name:crookcutlass,
                                            description:crookcutlass.description,
                                            quantity:Number(1)
                                        }
                                        foundUser.inventory.weapons.push(newItem)
                                    }
                                    await inventory.updateOne({userID:authorId},foundUser)
                                }
                                
                            })
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        
                        
                    }
                    else if(dungeon.step == 8){
                        let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #8')
                        .setDescription(`you walked into a hamock room!\nYou recovered 50% HP!`)
                        let health
                        if(foundUser.health + 0.5*foundUser.health > getHealth(foundUser.level,foundUser.vitality)){
                            health = getHealth(foundUser.level,foundUser.vitality)
                        }
                        else{
                            health = Math.round(foundUser.health + 0.5*foundUser.health)
                        }
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:health})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                    }
                    else if(dungeon.step == 9){
                        const pick = weightedRandom(["En1","En2","En3","En4","En5"],[0.5,0.2,0.2,0.09,0.01])
                        if(pick == "En1"){
                            const attacker = Warrior.create(author)
                            const monster = BeerBuccaneer1.create()
                            await interaction.reply(`You encountered a ${monster.name}!`)
                            await sleep(1.5)
                            attacker.health=foundUser.health
                                    attacker.mana=foundUser.mana
                                    attacker.armor=foundUser.armour
                                    attacker.magicPower=foundUser.magicPower
                                    attacker.attackDamage=foundUser.attackDamage
                                    attacker.evasion=foundUser.evasion
                                    attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                    attacker.element = foundUser.elements[0]
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
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En2"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #9')
                        .setDescription(`you stepped into a room with Broken Glass!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En3"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #9')
                        .setDescription(`you stepped into a Slippery Floor!\nYou lost 10% of your health!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{health:Math.round(foundUser.health-0.1*foundUser.health)})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En4"){
                            let stepembed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('STEP #9')
                        .setDescription(`you found a stash of Money!\nYou recieved 1000 coins!`)
                        await interaction.reply({embeds:[stepembed],components:[]})
                        await profileModel.updateOne({userID:authorId},{coins:foundUser.coins+1000})
                        dungeon.step+=1
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        else if(pick == "En5"){
                            let stepembed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('STEP #9')
                            .setDescription(`you found yourself wandering into the weapon room!\nCapn. Crook's Cutlass x 1 added to inventory!`)
                            await interaction.reply({embeds:[stepembed],components:[]})
    
                            inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                                if(err){
                                    console.log(err);
                                    
                                }
                                else{
                                    const foundItem = foundUser.inventory.weapons.find(item => item.name.name === crookcutlass.name)
                                    if (foundItem){
                    
                                        foundItem.quantity+=1
                                    }
                                    else{
                                        const newItem = {
                                            name:crookcutlass,
                                            description:crookcutlass.description,
                                            quantity:Number(1)
                                        }
                                        foundUser.inventory.weapons.push(newItem)
                                    }
                                    await inventory.updateOne({userID:authorId},foundUser)
                                }
                                
                            })
                            dungeon.step+=1
                                await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        }
                        
                        
                    }
                    else if(dungeon.step == 10){
                        const attacker = Warrior.create(author)
                            const monster = captainCrook.create()
                            await interaction.reply(`You encountered ${monster.name}!`)
                            await sleep(1.5)
                            attacker.health=foundUser.health
                                    attacker.mana=foundUser.mana
                                    attacker.armor=foundUser.armour
                                    attacker.magicPower=foundUser.magicPower
                                    attacker.attackDamage=foundUser.attackDamage
                                    attacker.evasion=foundUser.evasion
                                    attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                    attacker.element = foundUser.elements[0]
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
                            dungeon.step+=1
                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                        
                    }
                    else if(dungeon.step == 11){
                        
                        let stepembed 
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.weapons.find(item => item.name.name === crookcutlass.name)
                                const foundweapon = foundUser.weapon[0].name == crookcutlass.name
                                if (foundItem || foundweapon){
                
                                     stepembed = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('DUNGEON-END')
                                    .setDescription(`you finally reached the treasure room! You found many valuable items and decided to keep them\nYou found Treasure x 1!\n5000 coins added!`)
                                    await interaction.reply({embeds:[stepembed],components:[]})
                                    await profileModel.updateOne({userID:authorId},{coins:foundUser.coins+5000})
                                }
                                else{
                                    stepembed = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('DUNGEON-END')
                                    .setDescription(`you finally reached the treasure room! You found many valuable items and decided to keep them\nCapn. Crook's Cutlass x 1 added to inventory!`)
                                    await interaction.reply({embeds:[stepembed],components:[]})
                                    const newItem = {
                                        name:crookcutlass,
                                        description:crookcutlass.description,
                                        quantity:Number(1)
                                    }
                                    foundUser.inventory.weapons.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                        
                        dungeon.step = 0
                        dungeon.name = ""
                        dungeon.status = false
                        foundUser.completed_dungeons.push("Abandoned Castle")
                        await profileModel.updateOne({userID:authorId},{dungeon:dungeon,completed_dungeons:foundUser.completed_dungeons})

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