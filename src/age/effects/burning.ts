import { emoji } from '../../lib/utils/emoji'
import { Effect } from '../classes'

export class Burning extends Effect {
    constructor() {
        super({
            name: 'Burning',
            description: 'Burning',
            duration: 3,
            stacks: 1,
            emoji: emoji.FIRE,
        })
    }
}
