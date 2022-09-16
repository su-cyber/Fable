import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import inventory from '../models/InventorySchema'

export default new MyCommandSlashBuilder({ name: 'inventory', description: 'open your inventory' }).setDo(
    async (bot, interaction) => {

        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

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
                                return `${item.name} X ${item.quantity}`
                            }).join("\n")
                            const mappedweapons=foundUser.inventory.weapons.map((weapon) => {
                                return `${weapon.name.name} X ${weapon.quantity}`
                            }).join("\n")
                            await interaction.reply({content:`${mappeditems}
                            ${mappedweapons}`});
                        }
                    })
                }
                else{
                    await interaction.reply({content:"you are not awakened yet!"})
                }
            }
        })
    })