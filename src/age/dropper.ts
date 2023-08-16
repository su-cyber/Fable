import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js'
import sample from 'lodash.sample'
import sum from 'lodash.sum'
import { formatMoney, randfloat, randint, removeIndentation } from '../utils'
import { weightedRandom } from '../utils/weightedRandom'
import { Entity } from './classes/entity'
import { CauseOfDeath } from './enums'
import { Item } from './item'
import inventory from '../../models/InventorySchema'
import profileModel from '../../models/profileSchema'
import { MonsterEntity } from './classes'
import { amberRing } from './items/amber_ring'


type Props = {
    item: Item
    dropRate: number
}

type Messages = {
    withDropMessages: string[]
    withoutDropMessages: string[]
}

/**
 * Used to drop an item when a mob dies
 */
export class Dropper {
    dropRateSum: number

    constructor(public items: Props[]) {
        this.dropRateSum = sum(items.map(item => item.dropRate))

        if (this.dropRateSum > 1) {
            throw new Error('Drop rate sum must be less or equal than 1')
        }
    }

    /**
     * Returns an item based on the drop rate of each item
     */
    drop(): Item {
        const dropRates = this.items.map(item => item.dropRate)
        const items = this.items.map(item => item.item)

        return weightedRandom([...items, null], [...dropRates, 1 - this.dropRateSum])
    }

    async sendDeathMessage(
        { withDropMessages, withoutDropMessages }: Messages,
        interaction: CommandInteraction,
        killed: MonsterEntity,
        killer: Entity
    ) {
        let gainedXP=killed.xp
       
        
       profileModel.findOne({userID:interaction.user.id},async function(err,foundUser){
        console.log(foundUser.items[0].name);
        
        if(foundUser.items[0].name == "Amber Ring"){
            gainedXP = Math.round(gainedXP + gainedXP*0.1)
            console.log(gainedXP);
            
            
        }
       })
        const coins = formatMoney(randfloat(1, 1e8, 3), 3)
        const drop = this.drop()
        const text = `
            **${killed.name} was successfully Subdued!**

            ${drop ? sample(withDropMessages)  : sample(withoutDropMessages)}


            You gained ${gainedXP} XP!
            
            ${drop ? `You found ${drop.name}! 
            ${drop.emoji} X ${1}` : ''}
        `
        if(drop){
            this.addItem(interaction,drop,1)

           

        }
       
        let deathEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('BATTLE REPORT')
        .setDescription(`${removeIndentation(text)}`)
        // await (interaction.client.channels.cache.get(`996424956428689518`) as TextChannel).send({embeds:[deathEmbed]})
        await interaction.channel.send({embeds:[deathEmbed]})
        profileModel.findOne({userID:interaction.user.id},async function(err,foundUser){
            foundUser.xp+=gainedXP
            await profileModel.updateOne({userID:interaction.user.id},{xp:foundUser.xp})
        })
    }

    async addItem(interaction:CommandInteraction,drop:Item,quantity:number){
        
        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
            if(err){
                console.log(err);
                
            }
            else{
                const foundItem = foundUser.inventory.items.find(item => item.name.name === drop.name)
                if (foundItem){

                    foundItem.quantity+=quantity
                }
                else{
                    const newItem = {
                        name:drop,
                        description:drop.description,
                        quantity:Number(quantity)
                    }
                    foundUser.inventory.items.push(newItem)
                }
                profileModel.findOne({userID:interaction.user.id},async function(err,foundProfile){

            
            
            
                    if(foundProfile.quest_item === drop.name && foundProfile.quest == true){
                        
                        const change = foundProfile.quest_quantity - 1
                        await profileModel.updateOne({userID:interaction.user.id},{quest_quantity: change})
                        if(foundProfile.quest_quantity === 0){
                            await profileModel.updateOne({userID:interaction.user.id},{quest: false})
                        }
                       
                        
                        
                    }
                
                
                
            })

               
                await inventory.updateOne({userID:interaction.user.id},foundUser)
            }
        })
    }
}
