import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { sleep, weightedRandom } from '../src/utils'
import { Warrior } from '../src/age/heroes/warrior'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { MessageEmbed } from 'discord.js'
import { backBreaker } from '../src/age/items/backbreaker'
import { PvEDuel } from './fight'
import { crookcutlass } from '../src/age/weapons/crook\'scutlass'
import getHealth from '../src/utils/getHealth'
import { captainCrook } from '../src/age/Dungeon-Mobs/captainCrook'
import { MessageAttachment } from 'discord.js'
import { BeerBuccaneer1 } from '../src/age/monsters/Sunshade Forest/BeerBuccaneer1'
import { BeerBuccaneer2 } from '../src/age/monsters/Sunshade Forest/BeerBuccaneer2'
import { TextChannel } from 'discord.js'
import { getEmoji } from './fight'
import { stoneCarver } from '../src/age/Dungeon-Mobs/stoneCarver'
import { Marinowl } from '../src/age/Dungeon-Mobs/marinowl'
import { Hydragon } from '../src/age/Dungeon-Mobs/hydragon'
import { kabuto } from '../src/age/weapons/kabuto'
import { Dinocodile } from '../src/age/Dungeon-Mobs/dynocodile'
import { popGreen_Grimoire } from '../src/age/grimoires/popGreen'


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
                                    interaction.reply({content:`You cannot move as you dont have any energy left!You can view your current energy in your Keystone Grimoire and you regain 1 energy every 1 hour in real-time.Every battle costs 1 energy and energy is needed to move inside dungeons but is only spent if you engage in a battle`,ephemeral:true})
                                }
                                else{
                                    if(dungeon.name === "Abandoned Castle"){
                                        if(dungeon.step == 1){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #1')
                                            .setDescription(`you found 5 bottles of backbreaker!\nBackBreaker x 5 added to inventory!`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            inventory.findOne({userID:interaction.user.id},async function(err,foundInventory){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    const foundItem = foundInventory.inventory.items.find(item => item.name.name === backBreaker.name)
                                                    if (foundItem){
                                    
                                                        foundItem.quantity+=5
                                                    }
                                                    else{
                                                        const newItem = {
                                                            name:backBreaker,
                                                            description:backBreaker.description,
                                                            quantity:Number(5)
                                                        }
                                                        foundInventory.inventory.items.push(newItem)
                                                    }
                                                    
                                                    await inventory.updateOne({userID:authorId},foundInventory)
                                                    dungeon.step+=1
                                                    await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                                }
                                                
                                            })
                                        }
                                        else if(dungeon.step == 2){
                                            
                                            const attacker = await Warrior.create(author)
                                            const monster = await BeerBuccaneer2.create()
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
                                                    attacker.element = foundUser.elements[0].toLowerCase();
                                                    attacker.passive_skills = foundUser.passiveskills
                                                    attacker.maxMana = foundUser.mana
                                                    attacker.speed = foundUser.speed
                                                    attacker.skills=foundUser.currentskills
                                                    attacker.level = foundUser.level
                                                    attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            const pick = weightedRandom(["En1","En2","En3","En4"],[0.5,0.2,0.2,0.09])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await BeerBuccaneer1.create()
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
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                            
                                            
                                        }
                                        else if(dungeon.step == 4){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #4')
                                            .setDescription(`you walked into a hamock room!\nYou recovered 50% HP!`)
                                            let health
                                            if(foundUser.health + 0.5*getHealth(foundUser.level,foundUser.vitality) > getHealth(foundUser.level,foundUser.vitality)){
                                                health = getHealth(foundUser.level,foundUser.vitality)
                                            }
                                            else{
                                                health = Math.round(foundUser.health + 0.5*getHealth(foundUser.level,foundUser.vitality))
                                            }
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            await profileModel.updateOne({userID:authorId},{health:health})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                    
                                        }
                                        else if(dungeon.step == 5){
                                            
                                            const attacker = await Warrior.create(author)
                                            const monster = await BeerBuccaneer2.create()
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
                                                    attacker.element = foundUser.elements[0].toLowerCase();
                                                    attacker.passive_skills = foundUser.passiveskills
                                                    attacker.maxMana = foundUser.mana
                                                    attacker.speed = foundUser.speed
                                                    attacker.skills=foundUser.currentskills
                                                    attacker.level = foundUser.level
                                                    attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            const pick = weightedRandom(["En1","En2","En3","En4"],[0.5,0.2,0.2,0.09])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await BeerBuccaneer1.create()
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
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                            
                                        }
                                        else if(dungeon.step == 7){
                                            const pick = weightedRandom(["En1","En2","En3","En4"],[0.5,0.2,0.2,0.09])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await BeerBuccaneer1.create()
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
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            .setTitle('STEP #7')
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
                                            
                                            
                                            
                                        }
                                        else if(dungeon.step == 8){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #8')
                                            .setDescription(`you walked into a hamock room!\nYou recovered 50% HP!`)
                                            let health
                                            if(foundUser.health + 0.5*getHealth(foundUser.level,foundUser.vitality) > getHealth(foundUser.level,foundUser.vitality)){
                                                health = getHealth(foundUser.level,foundUser.vitality)
                                            }
                                            else{
                                                health = Math.round(foundUser.health + 0.5*getHealth(foundUser.level,foundUser.vitality))
                                            }
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            await profileModel.updateOne({userID:authorId},{health:health})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                        }
                                        else if(dungeon.step == 9){
                                            const pick = weightedRandom(["En1","En2","En3","En4"],[0.5,0.2,0.2,0.09])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await BeerBuccaneer1.create()
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
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                        
                                                inventory.findOne({userID:interaction.user.id},async function(err,foundInventory){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        const foundItem = foundInventory.inventory.weapons.find(item => item.name.name === crookcutlass.name)
                                                        if (foundItem){
                                        
                                                            foundItem.quantity+=1
                                                        }
                                                        else{
                                                            const newItem = {
                                                                name:crookcutlass,
                                                                description:crookcutlass.description,
                                                                quantity:Number(1)
                                                            }
                                                            foundInventory.inventory.weapons.push(newItem)
                                                        }
                                                        await inventory.updateOne({userID:authorId},foundInventory)
                                                    }
                                                    
                                                })
                                                dungeon.step+=1
                                                    await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                            }
                                            
                                            
                                        }
                                        else if(dungeon.step == 10){
                                            const attacker = await Warrior.create(author)
                                                const monster = await captainCrook.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You encountered ${monster.name}!`,files:[attachment]})
                                                await sleep(2.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            const pick = weightedRandom(["En1","En2"],[0.8,0.2])
                                            let stepembed 
                                            if(pick == "En1"){
                                                stepembed = new MessageEmbed()
                                                        .setColor('RED')
                                                        .setTitle(`CROOK'S CHAMBERS`)
                                                        .addFields([
                                                            {
                                                                name: `Current Objective:`,
                                                                value:`**press /progressmainquest at the guild outpost to continue**`
                                                            }
                                                        ])
                                                        .setDescription(`You finally reached the end of the dungeon!You enter a rather well maintained room which looks like the personal room of Captain Crook You found many valuable items and decided to return all of them keeping only some for yourself\nYou found Coin Bag x 1!\n500 coins added!\n\n**You have Successfully completed the quest "Aube Town's Hero" and exited the Abandoned Castle**`)
                                                        await interaction.reply({embeds:[stepembed],components:[]})
                                                        await profileModel.updateOne({userID:authorId},{coins:foundUser.coins+500})
                                                        let fableLog = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('FABLE LOG')
                                                        .setDescription(`${interaction.user.username} has Cleared the Dungeon **"Abandoned Castle"**!`)
                                                        await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                                                        
                                            }
                                            else{
                                                stepembed = new MessageEmbed()
                                                        .setColor('RED')
                                                        .setTitle(`CROOK'S CHAMBERS`)
                                                        .addFields([
                                                            {
                                                                name: `Current Objective:`,
                                                                value:`**press /progressmainquest at the guild outpost to continue**`
                                                            }
                                                        ])
                                                        .setDescription(`You finally reached the end of the dungeon!You enter a rather well maintained room which looks like the personal room of Captain Crook, you found Captain Crook's Cutlass!\n\nCapn. Crook's Cutlass added to inventory!\n\n**You have Successfully completed the quest "Aube Town's Hero" and exited the Abandoned Castle**`)
                                                        await interaction.reply({embeds:[stepembed],components:[]})
                                                inventory.findOne({userID:interaction.user.id},async function(err,foundInventory){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        const foundItem = foundInventory.inventory.weapons.find(item => item.name.name === crookcutlass.name)
                                                        if (foundItem){
                                        
                                                            foundItem.quantity+=1
                                                        }
                                                        else{
                                                            const newItem = {
                                                                name:crookcutlass,
                                                                description:crookcutlass.description,
                                                                quantity:Number(1)
                                                            }
                                                            foundInventory.inventory.weapons.push(newItem)
                                                        }
                                                        await inventory.updateOne({userID:authorId},foundInventory)
                                                    }
                                                    let fableLog = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('FABLE LOG')
                                                    .setDescription(`${interaction.user.username} has Cleared the Dungeon **"Abandoned Castle"** and also managed to retrieve a rare weapon **"Captain Crook's Cutlass"**!`)
                                                    await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                                                    
                                                    
                                                })
                                            }
                                                    
                                    
                                                         
                                                    
                                                    
                                                
                                            
                                            dungeon.step = 0
                                            dungeon.name = ""
                                            dungeon.status = false
                                            foundUser.completed_dungeons.push("Abandoned Castle")
                                            foundUser.completed_quests.push("KS-TA-SQ5")
                                            foundUser.side_quest.splice(0,1)
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon,completed_dungeons:foundUser.completed_dungeons,completed_quests:foundUser.completed_quests,side_quest_phase:"1",side_quest:foundUser.side_quest})
                    
                                        }
                                        
                                     
                                    }
                                    else if(dungeon.name === "Aqua Canals"){
                                        if(dungeon.step == 1){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #1 - DIALOGUE')
                                            .setDescription(`“Man, I wish I could’ve joined “Shark Whip” Jetta! I heard he got the nickname when he saved a small town from an onslaught of Sea Spyriths. By the time the Rangers arrived, he had already beaten the Sea Spyriths by choking them using his Whip. They recruited him on the spot! Let’s meet them in the center! I can’t wait to see him in action!”`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                        }
                                        else if(dungeon.step == 2){
                                            
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #2')
                                            .setDescription(`You come across a splintered tree floating in the water. It is completely destroyed.`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                        }
                                        else if(dungeon.step == 3){
                                            const pick = weightedRandom(["En1","En2","En3"],[0.6,0.3,0.1])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await stoneCarver.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You Accidentally Step on a Stonecarver while walking in shallow water. It doesn't look happy and attacks you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                                const attacker = await Warrior.create(author)
                                                const monster = await Marinowl.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You spot a Marinowl nibbling on the remains of another boat. It sees you, and it is hungry. It is gliding swiftly towards you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            else if(pick == "En3"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await Hydragon.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`Your boat shakes aggressively, and stops moving. It is a Hydragon and it refuses to let go!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                            
                                            
                                            
                                        }
                                        else if(dungeon.step == 4){
                                            const pick = weightedRandom(["En1","En2","En3"],[0.3,0.6,0.1])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await stoneCarver.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You Accidentally Step on a Stonecarver while walking in shallow water. It doesn't look happy and attacks you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                                const attacker = await Warrior.create(author)
                                                const monster = await Marinowl.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You spot a Marinowl nibbling on the remains of another boat. It sees you, and it is hungry. It is gliding swiftly towards you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            else if(pick == "En3"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await Hydragon.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`Your boat shakes aggressively, and stops moving. It is a Hydragon and it refuses to let go!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                            
                                            
                    
                                        }
                                        else if(dungeon.step == 5){
                                            
                                            const pick = weightedRandom(["En1","En2","En3"],[0.6,0.3,0.1])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await stoneCarver.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You Accidentally Step on a Stonecarver while walking in shallow water. It doesn't look happy and attacks you!!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                                const attacker = await Warrior.create(author)
                                                const monster = await Marinowl.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You spot a Marinowl nibbling on the remains of another boat. It sees you, and it is hungry. It is gliding swiftly towards you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            else if(pick == "En3"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await Hydragon.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`Your boat shakes aggressively, and stops moving. It is a Hydragon and it refuses to let go!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                            
                                            
                                        }
                                        else if(dungeon.step == 6){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #6')
                                            .setDescription(`You're in deep waters.Time to hop onto the boat and rest up!\n\n**Health replenished by 25%!**\n**You obtained 2 Energy!**`)
                                            let health
                                            let energy
                                            if(foundUser.health + 0.25*getHealth(foundUser.level,foundUser.vitality) > getHealth(foundUser.level,foundUser.vitality)){
                                                health = getHealth(foundUser.level,foundUser.vitality)
                                            }
                                            else{
                                                health = Math.round(foundUser.health + 0.25*getHealth(foundUser.level,foundUser.vitality))
                                            }
                                            if(foundUser.energy+2 === 25){
                                                energy = 25
                                            }
                                            else{
                                                energy = foundUser.energy+2
                                            }
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{health:health,dungeon:dungeon,energy:energy})
                                            
                                        }
                                        else if(dungeon.step == 7){
                                            const pick = weightedRandom(["En1","En2"],[0.3,0.7])
                                            if(pick == "En1"){
                                                let stepembed
                                                const damage = Math.round(0.25*getHealth(foundUser.level,foundUser.vitality))
                                                if(foundUser.health-damage <= 0){
                                                    stepembed = new MessageEmbed()
                                                    .setColor('RED')
                                                    .setTitle('STEP #7')
                                                    .setDescription(`You feel a tremor. Stone debris from the Aqueducts start falling. Some of them damage you as you try to protect your boat.\nYou lost ${damage} health!\n\n**You were critically Injured and were rescued out of the Aqueducts**`)
                                                    await interaction.reply({embeds:[stepembed],components:[]})

                                                    foundUser.location = "None"
                                                    dungeon.status = false
                                                    dungeon.name = ""
                                                    dungeon.step = 0
                                                    await profileModel.updateOne({userID:authorId},{health:Math.round(0.1*getHealth(foundUser.level,foundUser.vitality)),location:foundUser.location,dungeon:dungeon})
                                                    }
                                                else{
                                                    stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #7')
                                            .setDescription(`You feel a tremor. Stone debris from the Aqueducts start falling. Some of them damage you as you try to protect your boat.\nYou lost ${damage} health!`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            await profileModel.updateOne({userID:authorId},{health:foundUser.health-damage})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                                }
                                                
                                            }
                                            else if(pick == "En2"){
                                                let stepembed
                                                const damage = Math.round(0.1*getHealth(foundUser.level,foundUser.vitality))
                                                if(foundUser.health-damage <= 0){
                                                    stepembed = new MessageEmbed()
                                                    .setColor('RED')
                                                    .setTitle('STEP #7')
                                                    .setDescription(`A seavine has you trapped in its grasp. You cut it up but it stings you badly.\nYou lost ${damage} health!\n\n**You were critically Injured and were rescued out of the Aqueducts**`)
                                                    await interaction.reply({embeds:[stepembed],components:[]})

                                                    foundUser.location = "None"
                                                    dungeon.status = false
                                                    dungeon.name = ""
                                                    dungeon.step = 0
                                                    await profileModel.updateOne({userID:authorId},{health:Math.round(0.1*getHealth(foundUser.level,foundUser.vitality)),location:foundUser.location,dungeon:dungeon})
                                                    }
                                                else{
                                                    stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #7')
                                            .setDescription(`A seavine has you trapped in its grasp. You cut it up but it stings you badly.\nYou lost ${damage} health!`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            await profileModel.updateOne({userID:authorId},{health:foundUser.health-damage})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                                }
                                        }
                                           
                                            
                                        }
                                        else if(dungeon.step == 8){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #8')
                                            .setDescription(`You come across an old Grimoire floating in the water.\n**Pop Grimoire added to inventory!**\n\nType **/use** command to use the Grimoire`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            inventory.findOne({userID:interaction.user.id},async function(err,foundInventory){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    const foundItem = foundInventory.inventory.items.find(item => item.name.name === popGreen_Grimoire.name)
                                                    if (foundItem){
                                    
                                                        foundItem.quantity+=1
                                                    }
                                                    else{
                                                        const newItem = {
                                                            name:popGreen_Grimoire,
                                                            description:popGreen_Grimoire.description,
                                                            quantity:Number(1)
                                                        }
                                                        foundInventory.inventory.items.push(newItem)
                                                    }
                                                    
                                                    await inventory.updateOne({userID:authorId},foundInventory)
                                                    dungeon.step+=1
                                                    await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                                }
                                                
                                            })
                                        }
                                        else if(dungeon.step == 9){
                                            const pick = weightedRandom(["En1","En2","En3"],[0.2,0.4,0.4])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await stoneCarver.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You Accidentally Step on a Stonecarver while walking in shallow water. It doesn't look happy and attacks you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                                const attacker = await Warrior.create(author)
                                                const monster = await Marinowl.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You spot a Marinowl nibbling on the remains of another boat. It sees you, and it is hungry. It is gliding swiftly towards you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            else if(pick == "En3"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await Hydragon.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`Your boat shakes aggressively, and stops moving. It is a Hydragon and it refuses to let go!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                        }
                                        else if(dungeon.step == 10){
                                            const pick = weightedRandom(["En1","En2","En3"],[0.2,0.4,0.4])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await stoneCarver.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You Accidentally Step on a Stonecarver while walking in shallow water. It doesn't look happy and attacks you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                                const attacker = await Warrior.create(author)
                                                const monster = await Marinowl.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You spot a Marinowl nibbling on the remains of another boat. It sees you, and it is hungry. It is gliding swiftly towards you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            else if(pick == "En3"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await Hydragon.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`Your boat shakes aggressively, and stops moving. It is a Hydragon and it refuses to let go!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                        }
                                        else if(dungeon.step == 11){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #11 - DIALOGUE')
                                            .setDescription(`“Whew! The Aque Canals are infested with Sea Spyriths. I didn’t expect there to be so many. I shudder at the thought of people encountering them at sea. These tremors aren’t helping either. The boat is barely swimming. Keep your eyes out for anything suspicious guys, we must make it to the center.”`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                        }
                                        else if(dungeon.step == 12){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #12')
                                            .setDescription(`You're in deep waters.Time to hop onto the boat and rest up!\n\n**Health replenished by 25%!**\n**You obtained 2 Energy!**`)
                                            let health
                                            let energy
                                            if(foundUser.health + 0.25*getHealth(foundUser.level,foundUser.vitality) > getHealth(foundUser.level,foundUser.vitality)){
                                                health = getHealth(foundUser.level,foundUser.vitality)
                                            }
                                            else{
                                                health = Math.round(foundUser.health + 0.25*getHealth(foundUser.level,foundUser.vitality))
                                            }
                                            if(foundUser.energy+2 === 25){
                                                energy = 25
                                            }
                                            else{
                                                energy = foundUser.energy+2
                                            }
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{health:health,dungeon:dungeon,energy:energy})

                                        }
                                        else if(dungeon.step == 13){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #13')
                                            .setDescription(`You enter an area filled with intense fog. You hear screeches. The thickness of the fog leaves you quite vulnerable. And at the moment, a Marinowl glides into the scene, and flies, having nabbed a person from your group. You hear them scream and beg for help. However, the fog makes it impossible for you to give chase. Just then, another Marinowl swoops in from above but you kill it before any more damage can be done. This is getting quite dangerous.`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                        }
                                        else if(dungeon.step == 14){
                                            const pick = weightedRandom(["En1","En2","En3"],[0.1,0.45,0.45])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await stoneCarver.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You Accidentally Step on a Stonecarver while walking in shallow water. It doesn't look happy and attacks you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                                const attacker = await Warrior.create(author)
                                                const monster = await Marinowl.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You spot a Marinowl nibbling on the remains of another boat. It sees you, and it is hungry. It is gliding swiftly towards you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            else if(pick == "En3"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await Hydragon.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`Your boat shakes aggressively, and stops moving. It is a Hydragon and it refuses to let go!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                        }
                                        else if(dungeon.step == 15){
                                            const pick = weightedRandom(["En1","En2"],[0.3,0.7])
                                            if(pick == "En1"){
                                                let stepembed
                                                const damage = Math.round(0.25*getHealth(foundUser.level,foundUser.vitality))
                                                if(foundUser.health-damage <= 0){
                                                    stepembed = new MessageEmbed()
                                                    .setColor('RED')
                                                    .setTitle('STEP #15')
                                                    .setDescription(`You feel a tremor. Stone debris from the Aqueducts start falling. Some of them damage you as you try to protect your boat.\nYou lost ${damage} health!\n\n**You were critically Injured and were rescued out of the Aqueducts**`)
                                                    await interaction.reply({embeds:[stepembed],components:[]})

                                                    foundUser.location = "None"
                                                    dungeon.status = false
                                                    dungeon.name = ""
                                                    dungeon.step = 0
                                                    await profileModel.updateOne({userID:authorId},{health:Math.round(0.1*getHealth(foundUser.level,foundUser.vitality)),location:foundUser.location,dungeon:dungeon})
                                                    }
                                                else{
                                                    stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #15')
                                            .setDescription(`You feel a tremor. Stone debris from the Aqueducts start falling. Some of them damage you as you try to protect your boat.\nYou lost ${damage} health!`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            await profileModel.updateOne({userID:authorId},{health:foundUser.health-damage})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                                }
                                                
                                            }
                                            else if(pick == "En2"){
                                                let stepembed
                                                const damage = Math.round(0.1*getHealth(foundUser.level,foundUser.vitality))
                                                if(foundUser.health-damage <= 0){
                                                    stepembed = new MessageEmbed()
                                                    .setColor('RED')
                                                    .setTitle('STEP #15')
                                                    .setDescription(`A seavine has you trapped in its grasp. You cut it up but it stings you badly.\nYou lost ${damage} health!\n\n**You were critically Injured and were rescued out of the Aqueducts**`)
                                                    await interaction.reply({embeds:[stepembed],components:[]})

                                                    foundUser.location = "None"
                                                    dungeon.status = false
                                                    dungeon.name = ""
                                                    dungeon.step = 0
                                                    await profileModel.updateOne({userID:authorId},{health:Math.round(0.1*getHealth(foundUser.level,foundUser.vitality)),location:foundUser.location,dungeon:dungeon})
                                                    }
                                                else{
                                                    stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #15')
                                            .setDescription(`A seavine has you trapped in its grasp. You cut it up but it stings you badly.\nYou lost ${damage} health!`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            await profileModel.updateOne({userID:authorId},{health:foundUser.health-damage})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                                }
                                        }
                                          
                                        }
                                        else if(dungeon.step == 16){
                                            const pick = weightedRandom(["En1","En2","En3"],[0.1,0.45,0.45])
                                            if(pick == "En1"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await stoneCarver.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You Accidentally Step on a Stonecarver while walking in shallow water. It doesn't look happy and attacks you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                                const attacker = await Warrior.create(author)
                                                const monster = await Marinowl.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You spot a Marinowl nibbling on the remains of another boat. It sees you, and it is hungry. It is gliding swiftly towards you!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            else if(pick == "En3"){
                                                const attacker = await Warrior.create(author)
                                                const monster = await Hydragon.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`Your boat shakes aggressively, and stops moving. It is a Hydragon and it refuses to let go!`,files:[attachment]})
                                                await sleep(1.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                            
                                            
                                        }
                                        else if(dungeon.step == 17){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #13')
                                            .setDescription(`You come across Jetta’s Ranger License floating in the water.\n\n**You picked up Jetta’s Ranger License!**`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                        }
                                        else if(dungeon.step == 18){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #18')
                                            .setDescription(`You're close to the center, but your group has sustained significant injuries and this is the last bit of strength they’re capable of mustering. They let you rest, and use up the supplies by guarding you while you recover strength.\n\n“That was Jetta’s License! Damnit, this means they reached the center first, and are probably engaged with whatever the thing is, that is causing these tremors. They probably rushed just so they could stop it before it ruined Zorya’s Aqueducts. We must make haste!”\n\n**Health replenished by 25%!**\n**You obtained 2 Energy!**`)
                                            let health
                                            let energy
                                            if(foundUser.health + 0.25*getHealth(foundUser.level,foundUser.vitality) > getHealth(foundUser.level,foundUser.vitality)){
                                                health = getHealth(foundUser.level,foundUser.vitality)
                                            }
                                            else{
                                                health = Math.round(foundUser.health + 0.25*getHealth(foundUser.level,foundUser.vitality))
                                            }
                                            if(foundUser.energy+2 === 25){
                                                energy = 25
                                            }
                                            else{
                                                energy = foundUser.energy+2
                                            }
                                            await interaction.reply({embeds:[stepembed],components:[]})
                                            dungeon.step+=1
                                            await profileModel.updateOne({userID:authorId},{health:health,dungeon:dungeon,energy:energy})

                                        }
                                        if(dungeon.step == 1){
                                            let stepembed = new MessageEmbed()
                                            .setColor('RED')
                                            .setTitle('STEP #19')
                                            .setDescription(`After a short while, your group finally makes it to the center, only to uncover several boats, destroyed beyond comprehension, and the water dyed in crimson red with bodies of men floating above. These must be the Rangers who responded before your group. They were completely annihilated. However, you still hear roars and clanging of weapons in close proximity. However, seeing the danger that lies ahead, you leave your group behind and move by yourself. You ask them to retreat and call for backup.\n\nMeanwhile, from within the fog, you see a man hurling through the air. It was Jetta. He fell in the nearby rubble of broken aqueducts. He was badly hurt.\n\n“Ugh…I wish you didn’t have to see me like this **${interaction.user.username}**. So much for an expert. Yo-you should run away, before it is too late. I don’t want to lie to you, but this is too much for an E-Grade to handle. I’ll buy time, so please run away!” Jetta said as he tightly held his broken arm.\n\nYou couldn't just run away though. You had to protect Jetta. So you decide to face the monstrous Sea Spyrith that had claimed so many lives. You follow the sounds of battle to locate it, but you hear a yell from behind.\n\n“Stop! Don’t be an idiot. Here! If you wish to be stubborn, at least carry this with you. It's my Kabuto. My parents were both struggling merchants. I made Kabuto because I thought I could protect them if they ever got attacked by a Sea Spyrith. I would practice day in and day out so my parents would recognise me, and take me with them. But one day, both of them left to carry out their trade and never returned. A Sea Spyrith claimed their life. Even though it wasn’t my fault, I still blamed myself for not being ready sooner. I don’t want you to go through that. Please accept this.” Said Jetta as he held his arms forward presenting the Kabuto to you.\n\n**Received Kabuto x1**`)
                                            await interaction.reply({embeds:[stepembed],components:[]})
                    
                                            inventory.findOne({userID:interaction.user.id},async function(err,foundInventory){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    const foundItem = foundInventory.inventory.weapons.find(item => item.name.name === kabuto.name)
                                                    if (foundItem){
                                    
                                                        foundItem.quantity+=1
                                                    }
                                                    else{
                                                        const newItem = {
                                                            name:kabuto,
                                                            description:kabuto.description,
                                                            quantity:Number(1)
                                                        }
                                                        foundInventory.inventory.weapons.push(newItem)
                                                    }
                                                    
                                                    await inventory.updateOne({userID:authorId},foundInventory)
                                                    dungeon.step+=1
                                                    await profileModel.updateOne({userID:authorId},{dungeon:dungeon})
                                                }
                                                
                                            })
                                        }
                                        else if(dungeon.step == 20){
                                            
                                               let stepembed = new MessageEmbed()
                                                        .setColor('RED')
                                                        .setTitle(`STEP #20 - BOSS ENCOUNTER`)
                                                        .setDescription(`You follow the noise, and make it to a small grove. Blood is sprayed everywhere. You see a few injured Rangers trying to catch their breaths and others who were holding off the monstrosity that threatened their lives. It was a Dinocodile - a colossal Sea Spyrith that could cause mild quakes just by smashing its tail on the ground. You glance at it and notice a Ranger it chewed in its mouth. They belonged to Jetts’s group. Just witnessing this fuels you with rage and you rush towards the Spyrith to attack it.\n\n**FIGHT STARTS IN 10 SECONDS**`)
                                                        await interaction.reply({embeds:[stepembed],components:[]})
                                                        await sleep(10)
                                                        const attacker = await Warrior.create(author)
                                                const monster = await Dinocodile.create()
                                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                                await interaction.reply({content:`You encountered a ${monster.name}!`,files:[attachment]})
                                                await sleep(2.5)
                                                await interaction.editReply({files:[]})
                                                attacker.health=foundUser.health
                                                        attacker.mana=foundUser.mana
                                                        attacker.armor=foundUser.armour
                                                        attacker.magicPower=foundUser.magicPower
                                                        attacker.attackDamage=foundUser.attackDamage
                                                        attacker.magicResistance = foundUser.magicResistance
                                                        attacker.evasion=foundUser.evasion
                                                        attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                        attacker.element = foundUser.elements[0].toLowerCase();
                                                        attacker.passive_skills = foundUser.passiveskills
                                                        attacker.maxMana = foundUser.mana
                                                        attacker.speed = foundUser.speed
                                                        attacker.skills=foundUser.currentskills
                                                        attacker.level = foundUser.level
                                                        attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`
                                
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
                                               
                                                    let fableLog = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('FABLE LOG')
                                                    .setDescription(`${interaction.user.username} has Cleared the Dungeon **"Abandoned Castle"** and also managed to retrieve a rare weapon **"Captain Crook's Cutlass"**!`)
                                                    await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                                                    
                                                    
                                                
                                            
                                                    
                                    
                                                         
                                                    
                                                    
                                                
                                            
                                            dungeon.step = 0
                                            dungeon.name = ""
                                            dungeon.status = false
                                            foundUser.completed_dungeons.push("Abandoned Castle")
                                            foundUser.completed_quests.push("KS-TA-SQ5")
                                            foundUser.side_quest.splice(0,1)
                                            await profileModel.updateOne({userID:authorId},{dungeon:dungeon,completed_dungeons:foundUser.completed_dungeons,completed_quests:foundUser.completed_quests,side_quest_phase:"1",side_quest:foundUser.side_quest})
                    
                                        }
                                        else if(dungeon.step === 21){
                                            let stepembed = new MessageEmbed()
                                                        .setColor('GREEN')
                                                        .setTitle(`DUNGEON CLEARED - QUEST COMPLETED`)
                                                        .addFields([
                                                            {
                                                                name: `Rewards:`,
                                                                value:`**You Recieved 2500🪙**\n**You Recieved 45 Merit!**`
                                                            }
                                                        ])
                                                        .setDescription(`Even after all your attacks, you still fail to kill the Dinocodile. The fight leaves you extremely weakened and unable to stand up. You retreat slightly crawling on the floor using your arms and legs, but the Dinocodile doesn’t let you. It wails around its tail to crush you but then, you see Jetta atop an Aqueduct, using his whips to bind the Dinocodile’s tail. You take this moment to launch one final attack using Kabuto and slay the Spyrith.\n\n“When I lost my parents, I thought to myself how these Sea Spyriths could just decide to kill my parents anytime, and they would do that without any consequences. That day I vowed to myself, I would never let the same happen to anybody else, at least not on my watch. But it still happened. I am sorry. Today I wasn’t the expert people thought me to be. But you, you were still the Hero I had heard about. Seeing you march into danger like that, without hesitation, reminded me of what I had lost over these few years.\n\nThanks to you, I think I have regained some of it back. You were great, Hero.” said Jetta leaning his head to the side, with a glowing grin on his face\n\nWith that, you had defeated all the Sea Spyriths that had entered through the Sea Gates. Due to your efforts, engineers in Zorya were able to fix the Sea Gates in time. Meanwhile authorities arrive with backup, handle the situation and escort you back to Zorya alongside other Rangers. You bid farewell to Jetta as he hops into a Skyship headed for the Coral Islands. The two of you promise to have a battle the next time you meet. Until then, Jetta lets you hold onto his Kabuto.`)
                                                        await interaction.reply({embeds:[stepembed],components:[]})
                                                        
                                                        
                                                        let fableLog = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('FABLE LOG')
                                                        .setDescription(`${interaction.user.username} has Cleared the Dungeon **"Aqua Canals"** and completed the quest "Mysterious Seagate Malfunction"!`)
                                                        await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                                                        
      
                                                dungeon.step = 0
                                                dungeon.name = ""
                                                dungeon.status = false
                                                foundUser.completed_dungeons.push("Aqua Canals")
                                                foundUser.completed_quests.push("KS-ZS-SQ3")
                                                foundUser.side_quest.splice(0,1)
                                                await profileModel.updateOne({userID:authorId},{dungeon:dungeon,completed_dungeons:foundUser.completed_dungeons,completed_quests:foundUser.completed_quests,side_quest_phase:"1",side_quest:foundUser.side_quest,coins:foundUser.coins+2500,merit:foundUser.merit+45})
                        
                                        
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