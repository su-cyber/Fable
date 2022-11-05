import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { arachnidVenom } from '../src/age/items'
import { ghoulSkull } from '../src/age/items'
import { Sword } from '../src/age/weapons/sword'
import { steelArmour } from '../src/age/armour/steel_armour'
import { healthPotion } from '../src/age/potions/healthPotion'

export default new MyCommandSlashBuilder({ name: 'awaken', description: 'Awaken to your story' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        
        profileModel.exists({userID: authorId},async function(err,res){
            if(res){
               await interaction.reply({content:"You have already begun your journey!"});
            }
            else{
                await interaction.reply({content:"You have awakened!"});
                let profile = await new profileModel({
                    userID: authorId,
                    serverID: guildID,
                    coins: 20000,
                    xp:205,
                    level:1,
                    skill_points:0,
                    vitality:1,
                    health: 100,
                    magicPower: 5,
                    mana: 50,
                    evasion: 0.05,
                    magicResistance: 5,
                    armour: 5,
                    attackDamage: 10,
                    weapon: [],
                    armourSuit:[],
                    items:[],
                    weaponskills: [{
                        name: 'Basic attack',
                        description: 'Basic attack',
                    },{name: 'Charged Attack',
                    description: 'Charge a powerful attack for 1 turn'},],
                    magicskills:[{
                        name: 'Fireball',
                        description: 'Dealing damage and burning them for 3 turns',
                    }],
                    passiveskills:[],
                    quest:false,
                    quest_location:'',
                    quest_mob:'',
                    quest_quantity:0,
                    quest_item:''
                    
                })
                profile.save();

            let playerInventory = await new inventory({
                userID: authorId,
                serverID: guildID,
                inventory: {
                    weapons:[{name: Sword,
                    quantity:Number(1)}],
                    items:[{name:arachnidVenom.name,
                        description:arachnidVenom.description,
                        quantity:Number(2)
                    }, {name:ghoulSkull.name,
                        description:ghoulSkull.description,
                        quantity:Number(3)

                    }],
                    armour:[{name: steelArmour,
                        quantity:Number(1)}],
                    potions:[{
                        name: healthPotion,
                        quantity:Number(1)
                    }],
                }
            })
            playerInventory.save();
            }
        })
        

    })