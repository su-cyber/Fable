import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandIntegerOption} from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'
import aubeTownShop from '../src/age/shops/aubeTownShop'
import { Weapon } from '../src/age/classes/weapon'
import { Armour } from '../src/age/classes/armour'
import { Potion } from '../src/age/classes/potion'
import zoryaShop from '../src/age/shops/zoryaShop'
import blackMarket_zorya from '../src/age/shops/blackMarket_zorya'


export default new MyCommandSlashBuilder({ name: 'buy', description: 'buy any weapon,armour or item' })

.addStringOption((option: SlashCommandStringOption) =>
        option.setName('object').setDescription('name of the weapon,armour or item').setRequired(true)
    )
.addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName('quantity').setDescription('quantity to buy').setRequired(true)
)
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const userobject = interaction.options.getString('object').toLowerCase()
        const userQuantity = interaction.options.getInteger('quantity')


        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,profile){
                        const location = profile.location
                    
                    if(location == "Crofter's Market"){
                        
                            const foundObject = aubeTownShop.Total.find(object => object.name.toLowerCase() === userobject.toLowerCase())
                            if(foundObject){
                                profileModel.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        if(userProfile.coins<foundObject.cost*userQuantity){
                                            interaction.reply({content:"you dont have enough coins!",ephemeral:true})
                                        }
                                        else{
                                            userProfile.coins-=foundObject.cost*userQuantity
                                            inventory.exists({userID:authorId},async function(err,res){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    if(res){
                                                        inventory.findOne({userID:authorId},async function(err,foundProfile){
                                                            if(err){
                                                                console.log(err);
                                                                
                                                            }
                                                            else{
                                                                let foundInventory
                                                                if(foundObject instanceof Weapon){
                                                                     foundInventory=foundProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())

                                                                     if(foundInventory){
                                                                        foundInventory.quantity+=userQuantity
                                                                    }
                                                                    else{
                                                                        
                                                                        const newItem = {
                                                                            name:foundObject,
                                                                            quantity:Number(userQuantity)
                                                                        }
                                                                        foundProfile.inventory.weapons.push(newItem)
                                                                    }
                                                                }
                                                                else if(foundObject instanceof Armour){
                                                                    foundInventory=foundProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                                
                                                                    if(foundInventory){
                                                                        foundInventory.quantity+=userQuantity
                                                                    }
                                                                    else{
                                                                        
                                                                        const newItem = {
                                                                            name:foundObject,
                                                                            quantity:Number(userQuantity)
                                                                        }
                                                                        foundProfile.inventory.armour.push(newItem)
                                                                    }
                                                                }
                                                                else if(foundObject instanceof Potion){
                                                                    foundInventory=foundProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                                
                                                                    if(foundInventory){
                                                                        foundInventory.quantity+=userQuantity
                                                                    }
                                                                    else{
                                                                        
                                                                        const newItem = {
                                                                            name:foundObject,
                                                                            quantity:Number(userQuantity)
                                                                        }
                                                                        foundProfile.inventory.potions.push(newItem)
                                                                    }
                                                                }
                                                                else{
                                                                    foundInventory=foundProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                                
                                                                    if(foundInventory){
                                                                        foundInventory.quantity+=userQuantity
                                                                    }
                                                                    else{
                                                                        
                                                                        const newItem = {
                                                                            name:foundObject,
                                                                            quantity:Number(userQuantity)
                                                                        }
                                                                        foundProfile.inventory.items.push(newItem)
                                                                    }
                                                                }
                                                                
                                                                
                                                                
                                                            await inventory.updateOne({userID:authorId},foundProfile)
                
                                                            
                                                            }
                                                            
                                                        })
                                                        await interaction.reply({content:`${userQuantity} ${foundObject.name}(s) has been bought successfully!`})
                                                    }
                                                    else{
                                                       
                                                    }
                            
                                                }
                                            })
                                        }
                                        await profileModel.updateOne({userID:authorId},userProfile)
                                    }})
                                    
                                
                            }
                            else{
                                await interaction.reply({content:`no object called ${userobject} was found in the shop`,ephemeral:true})
                            }
                        
                        
                        
    
                        
                    }
                    else if(location == "Siewelle Port"){
                        
                        const foundObject = zoryaShop.Total.find(object => object.name.toLowerCase() === userobject.toLowerCase())
                        if(foundObject){
                            profileModel.findOne({userID:authorId},async function(err,userProfile){
                                if(err){
                                    console.log(err);
                                    
                                }
                                else{
                                    if(userProfile.coins<foundObject.cost*userQuantity){
                                        interaction.reply({content:"you dont have enough coins!",ephemeral:true})
                                    }
                                    else{
                                        userProfile.coins-=foundObject.cost*userQuantity
                                        inventory.exists({userID:authorId},async function(err,res){
                                            if(err){
                                                console.log(err);
                                                
                                            }
                                            else{
                                                if(res){
                                                    inventory.findOne({userID:authorId},async function(err,foundProfile){
                                                        if(err){
                                                            console.log(err);
                                                            
                                                        }
                                                        else{
                                                            let foundInventory
                                                            if(foundObject instanceof Weapon){
                                                                 foundInventory=foundProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())

                                                                 if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.weapons.push(newItem)
                                                                }
                                                            }
                                                            else if(foundObject instanceof Armour){
                                                                foundInventory=foundProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                            
                                                                if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.armour.push(newItem)
                                                                }
                                                            }
                                                            else if(foundObject instanceof Potion){
                                                                foundInventory=foundProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                            
                                                                if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.potions.push(newItem)
                                                                }
                                                            }
                                                            else{
                                                                foundInventory=foundProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                            
                                                                if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.items.push(newItem)
                                                                }
                                                            }
                                                            
                                                            
                                                            
                                                        await inventory.updateOne({userID:authorId},foundProfile)
            
                                                        
                                                        }
                                                        
                                                    })
                                                    await interaction.reply({content:`${userQuantity} ${foundObject.name}(s) has been bought successfully!`})
                                                }
                                                else{
                                                   
                                                }
                        
                                            }
                                        })
                                    }
                                    await profileModel.updateOne({userID:authorId},userProfile)
                                }})
                                
                            
                        }
                        else{
                            await interaction.reply({content:`no object called ${userobject} was found in the shop`,ephemeral:true})
                        }
                    
                    
                    

                    
                }
                else if(location == "Black Market"){
                        
                    const foundObject = blackMarket_zorya.Total.find(object => object.name.toLowerCase() === userobject.toLowerCase())
                    if(foundObject){
                        profileModel.findOne({userID:authorId},async function(err,userProfile){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                if(userProfile.coins<foundObject.cost*userQuantity){
                                    interaction.reply({content:"you dont have enough coins!",ephemeral:true})
                                }
                                else{
                                    userProfile.coins-=foundObject.cost*userQuantity
                                    inventory.exists({userID:authorId},async function(err,res){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            if(res){
                                                inventory.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        let foundInventory
                                                        if(foundObject instanceof Weapon){
                                                             foundInventory=foundProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())

                                                             if(foundInventory){
                                                                foundInventory.quantity+=userQuantity
                                                            }
                                                            else{
                                                                
                                                                const newItem = {
                                                                    name:foundObject,
                                                                    quantity:Number(userQuantity)
                                                                }
                                                                foundProfile.inventory.weapons.push(newItem)
                                                            }
                                                        }
                                                        else if(foundObject instanceof Armour){
                                                            foundInventory=foundProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                        
                                                            if(foundInventory){
                                                                foundInventory.quantity+=userQuantity
                                                            }
                                                            else{
                                                                
                                                                const newItem = {
                                                                    name:foundObject,
                                                                    quantity:Number(userQuantity)
                                                                }
                                                                foundProfile.inventory.armour.push(newItem)
                                                            }
                                                        }
                                                        else if(foundObject instanceof Potion){
                                                            foundInventory=foundProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                        
                                                            if(foundInventory){
                                                                foundInventory.quantity+=userQuantity
                                                            }
                                                            else{
                                                                
                                                                const newItem = {
                                                                    name:foundObject,
                                                                    quantity:Number(userQuantity)
                                                                }
                                                                foundProfile.inventory.potions.push(newItem)
                                                            }
                                                        }
                                                        else{
                                                            foundInventory=foundProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                                        
                                                            if(foundInventory){
                                                                foundInventory.quantity+=userQuantity
                                                            }
                                                            else{
                                                                
                                                                const newItem = {
                                                                    name:foundObject,
                                                                    quantity:Number(userQuantity)
                                                                }
                                                                foundProfile.inventory.items.push(newItem)
                                                            }
                                                        }
                                                        
                                                        
                                                        
                                                    await inventory.updateOne({userID:authorId},foundProfile)
        
                                                    
                                                    }
                                                    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${foundObject.name}(s) has been bought successfully!`})
                                            }
                                            else{
                                               
                                            }
                    
                                        }
                                    })
                                }
                                await profileModel.updateOne({userID:authorId},userProfile)
                            }})
                            
                        
                    }
                    else{
                        await interaction.reply({content:`no object called ${userobject} was found in the shop`,ephemeral:true})
                    }
                
                
                

                
            }
                
                
                    else{
                        interaction.reply({content:`You are not in a shop!`,ephemeral:true})
                    }
                })
  
                }
                else{
                    await interaction.reply({content:"it seems you are not an awakened yet",ephemeral:true})
                }
            }
        })
        
       




    })