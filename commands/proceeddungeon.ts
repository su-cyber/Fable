import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { sleep, weightedRandom } from '../src/utils'
import { Warrior } from '../src/age/heroes/warrior'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { MessageEmbed } from 'discord.js'
import { backBreaker } from '../src/age/items/backbreaker'
import { BeerBuccaneer2 } from '../src/age/monsters/Castellan Fields/BeerBuccaneer2'
import { PvEDuel } from './fight'
import { BeerBuccaneer1 } from '../src/age/monsters/Castellan Fields/BeerBuccaneer1'
import { crookcutlass } from '../src/age/weapons/crook\'scutlass'
import getHealth from '../src/utils/getHealth'
import { captainCrook } from '../src/age/Dungeon-Boss/captainCrook'
import { MessageAttachment } from 'discord.js'


export default new MyCommandSlashBuilder({ name: 'proceeddungeon', description: 'Move in the Dungeon' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        
        const author = await bot.users.fetch(authorId)
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    if(interaction.guild == null){
                        profileModel.findOne({userID:authorId},async function(err,foundUser) {
           
                            const dungeon = foundUser.dungeon
                            if(dungeon.status == true){
                                if(foundUser.energy <= 0){
                                    interaction.reply({content:`you cannot move as you dont have any energy left`,ephemeral:true})
                                }
                                else{
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
                                            const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                            await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                            
                                            await sleep(1.5)
                                            await interaction.editReply({files:[]})
                                                    attacker.health=foundUser.health
                                                    attacker.mana=foundUser.mana
                                                    attacker.armor=foundUser.armour
                                                    attacker.magicPower=foundUser.magicPower
                                                    attacker.attackDamage=foundUser.attackDamage
                                                    attacker.magicResistance = foundUser.magicResistance
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
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
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
                                            const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                            await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                            await sleep(1.5)
                                            await interaction.editReply({files:[]})
                                            attacker.health=foundUser.health
                                                    attacker.mana=foundUser.mana
                                                    attacker.armor=foundUser.armour
                                                    attacker.magicPower=foundUser.magicPower
                                                    attacker.magicResistance = foundUser.magicResistance
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
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
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
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.magicResistance = foundUser.magicResistance
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
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
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
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.magicResistance = foundUser.magicResistance
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
                                                        .addFields([
                                                            {
                                                                name: `Current Objective:`,
                                                                value:`**press /progressmainquest at the guild outpost to continue**`
                                                            }
                                                        ])
                                                        .setDescription(`you finally reached the treasure room! You found many valuable items and decided to keep them\nYou found Treasure x 1!\n5000 coins added!\n\n**You have Successfully completed the quest "Aube Town's Hero" and exited the Abandoned Castle**`)
                                                        await interaction.reply({embeds:[stepembed],components:[]})
                                                        await profileModel.updateOne({userID:authorId},{coins:foundUser.coins+5000})
                                                    }
                                                    else{
                                                        stepembed = new MessageEmbed()
                                                        .setColor('RED')
                                                        .setTitle('DUNGEON-END')
                                                        .addFields([
                                                            {
                                                                name: `Current Objective:`,
                                                                value:`**press /progressmainquest at the guild outpost to continue**`
                                                            }
                                                        ])
                                                        .setDescription(`you finally reached the treasure room! You found many valuable items and decided to keep them\nCapn. Crook's Cutlass x 1 added to inventory!\n\n**You have Successfully completed the quest "Aube Town's Hero" and exited the Abandoned Castle**`)
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
                                            foundUser.completed_quests.push("KS-TA-SQ5")
                                            foundUser.side_quest.splice(0,1)
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon,completed_dungeons:foundUser.completed_dungeons,completed_quests:foundUser.completed_quests,side_quest_phase:"1",side_quest:foundUser.side_quest})
                    
                                        }
                                        
                                     
                                    }
                                }
                                
                            }
                            else{
                                interaction.reply({content:`You are not inside a dungeon!`,ephemeral:true})
                            }
                        })
                    }
                    else{
                        interaction.reply(`You can only use this Command in DMs`)
                    }
        
    }
    else{
        interaction.reply({content:'it seems you are not awakened yet!',ephemeral:true})
    }
}
        })
    })