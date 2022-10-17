import { CommandInteraction } from 'discord.js'
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
        const gainedXP=killed.xp
        profileModel.findOne({userID:killer.id},async function(err,foundUser){
            foundUser.xp+=gainedXP
            await profileModel.findOneAndUpdate({userID:killer.id},foundUser)
        })
        const coins = formatMoney(randfloat(1, 1e8, 3), 3)
        const drop = this.drop()
        const text = `
            **${killed.name} was successfully killed!**

            ${drop ? sample(withDropMessages)  : sample(withoutDropMessages)}

            You gained few coins!
            🪙 X ${coins}
            You gained ${gainedXP} XP!
            
            ${drop ? `You found ${drop.name}! 
            ${drop.emoji} X ${1}` : ''}
        `
        if(drop){
            this.addItem(interaction,drop,1)

            profileModel.findOne({userID:interaction.user.id},async function(err,foundProfile){

            
            
            
                if(foundProfile.quest_item === drop.name && foundProfile.quest == true){
                    console.log("called");
                    const change = foundProfile.quest_quantity - 1
                    foundProfile.quest_quantity = change
                    if(foundProfile.quest_quantity === 0){
                        foundProfile.quest = false
                        
                    }
                    console.log(foundProfile.quest_quantity);
                    
                    await profileModel.findOneAndUpdate({userID:interaction.user.id},foundProfile)
                }
            
            console.log(foundProfile.quest_quantity);
            
        })

        }
       

        await interaction.channel.send(removeIndentation(text))
    }

    async addItem(interaction:CommandInteraction,drop:Item,quantity:number){
        
        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
            if(err){
                console.log(err);
                
            }
            else{
                const foundItem = foundUser.inventory.items.find(item => item.name === drop.name)
                if (foundItem){

                    foundItem.quantity+=quantity
                }
                else{
                    const newItem = {
                        name:drop.name,
                        description:drop.description,
                        quantity:Number(quantity)
                    }
                    foundUser.inventory.items.push(newItem)
                }

               
                await inventory.findOneAndUpdate({userID:interaction.user.id},foundUser)
            }
        })
    }
}
