import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import inventory from '../models/InventorySchema'

export default new MyCommandSlashBuilder({ name: 'inventory', description: 'open your inventory' }).setDo(
    async (bot, interaction) => {

        const authorId = interaction.user.id;

        inventory.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    inventory.findOne({userID:authorId},async function(err,foundUser) {
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            const mappeditems=foundUser.inventory.items.map((item) => {
                                return `${item.name.name} X ${item.quantity}`
                            }).join("\n")
                            const mappedweapons=foundUser.inventory.weapons.map((weapon) => {
                                return `${weapon.name.name} X ${weapon.quantity}`
                            }).join("\n")
                            const mappedarmour =foundUser.inventory.armour.map((armour) => {
                                return `${armour.name.name} X ${armour.quantity}`
                            }).join("\n")
                            const mappedpotions =foundUser.inventory.potions.map((potion) => {
                                return `${potion.name.name} X ${potion.quantity}`
                            }).join("\n")

                            await interaction.reply({content:`${mappeditems}\n ${mappedweapons}\n ${mappedarmour} \n ${mappedpotions}`});
                        }
                    })
                }
                else{
                    await interaction.reply({content:"you are not awakened yet!",ephemeral:true})
                }
            }
        })
    })