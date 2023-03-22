import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'
import flame_tree from './flame_tree'
import light_tree from './light_tree'
import samurai_tree from './samurai_tree'
import volt_tree from './volt_tree'
import wave_tree from './wave_tree'
import frost_tree from './frost_tree'
import gale_tree from './gale_tree'
import alloy_tree from './alloy_tree'
import venom_tree from './venom_tree'

const skills = flame_tree.concat(light_tree,samurai_tree,volt_tree,wave_tree,frost_tree,gale_tree,alloy_tree)

export default skills