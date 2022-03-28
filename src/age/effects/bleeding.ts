import { emoji } from '../../lib/utils/emoji'
import { Effect } from '../classes'

export class Bleeding extends Effect {
    constructor() {
        super({
            name: 'Bleeding',
            description: 'Bleeding',
            duration: 3,
            stacks: 1,
            emoji: emoji.BLEED,
        })
    }
}
