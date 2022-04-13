import { CommandInteraction } from 'discord.js'
import sample from 'lodash.sample'
import sum from 'lodash.sum'
import { formatMoney, randfloat, randint, removeIndentation } from '../utils'
import { weightedRandom } from '../utils/weightedRandom'
import { Entity } from './classes/entity'
import { CauseOfDeath } from './enums'
import { Item } from './item'

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
        killed: Entity
    ) {
        const coins = formatMoney(randfloat(1, 1e8, 3), 3)
        const drop = this.drop()
        const text = `
            **${killed.name} was successfully killed!**

            ${drop ? sample(withDropMessages) : sample(withoutDropMessages)}

            You gained few coins!
            🪙 X ${coins}
            
            ${drop ? `You found ${drop.name}! 
            ${drop.emoji} X ${1}` : ''}
        `

        await interaction.channel.send(removeIndentation(text))
    }
}
