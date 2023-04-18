import { emoji } from '../../lib/utils/emoji'
import { Item } from '../item'

export const silkBlob = new Item({
    id: 'item__silkBlob',
    name: 'Silk Blob',
    description: 'A blob of low quality silk',
    emoji: emoji.SLIME_GOO,
    cost:200,
    type:"none",
    skills:[]
})
