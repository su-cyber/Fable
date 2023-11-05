import { calculateModifier } from "../../../commands/fight";
import { calculateSTAB } from "../../../commands/fight";
import lvl_modifier from "../../utils/lvl_modifier";

const Grimoireskills = [{
    cooldown: 0,
    name: 'Pop Greens',
    description: `Shoot special seeds that soaks water and grows up massive vines that attacks the enemy.`,
    canEvade: true,
    type: 'magical',
    element: "bloom",
    damage: 40,
    mana_cost: 3,
    use: (attacker, defender) => {
        let mod = calculateModifier("bloom",defender.element)
        let stab = calculateSTAB("bloom",attacker.element)
        attacker.addLogMessage(`${attacker.name} used Pop Greens`);
        defender.takeDamage
            .magical(attacker.magicPower * 45 * lvl_modifier(attacker.level)*mod*stab)
            .run(damage => `${defender.name} was attacked by several vines that grew out of seeds shot by ${attacker.name} causing ${damage} HP`);
    }
},]

export default Grimoireskills