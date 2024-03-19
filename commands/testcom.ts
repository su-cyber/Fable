import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/skills/skills'
import passive_skills from '../src/age/heroes/allPassives'
import inventory from '../models/InventorySchema'
import sample from 'lodash.sample'
import { SlashCommandIntegerOption} from '@discordjs/builders'
import getHealth from '../src/utils/getHealth'
import { Client, Interaction, MessageEmbed } from 'discord.js'
import { calculate } from '../src/age/classes'
import hunting_contracts from '../src/utils/allHuntingContracts'
import { Bot } from '../src/bot'
import { emoji } from '../src/lib/utils/emoji'
import { BeerBuccaneer1 } from '../src/age/monsters/Sunshade Forest/BeerBuccaneer1'
import { MagmaGolem } from '../src/age/monsters/Dragon\'s Den/MagmaGolem'
import { BeerBuccaneer2 } from '../src/age/monsters/Sunshade Forest/BeerBuccaneer2'
import { Mosscale } from '../src/age/monsters/Stellaris Temple Ruins/mosscale'
import { bloodHound } from '../src/age/monsters/Bleeding Gorge/bloodHound'
import { Bogslither } from '../src/age/monsters/Stellaris Temple Ruins/bogslither'
import { Droner } from '../src/age/monsters/Sunshade Forest/Droner'
import { Treemick } from '../src/age/monsters/Castellan Fields/treemick'
import { Rockmauler } from '../src/age/monsters/Orld Tree Husk/rockmauler'

export default new MyCommandSlashBuilder({ name: 'testfight', description: 'fight with an encounter' })
.addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName('speed')
            .setDescription('set speed of simulation:1x,2x,4x')
            .setRequired(true)
            .addChoice('1x',3)
            .addChoice('2x',2)
            .addChoice('4x',1)
)
.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        var author = await bot.users.fetch(authorId)
        const setspeed = 0
        
        
        
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    
                        profileModel.findOne({userID:authorId},async function(err,foundUser){
                            if(foundUser.energy <= 0){
                                interaction.reply({content:`You cannot move as you dont have any energy left!You can view your current energy in your Keystone Grimoire and you regain 1 energy every 1 hour in real-time.Every battle costs 1 energy and energy is needed to move inside dungeons but is only spent if you engage in a battle`,ephemeral:true})
                                foundUser.encounter = []
                                await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                            }
                            else{
                                const team1 = [
                                    {name: BeerBuccaneer1.create(),level:1},
                                    {name: BeerBuccaneer2.create(),level:2},
                                    {name: Mosscale.create(),level:15},
                                    {name: bloodHound.create(),level:14},
                                ]
                                const team2 = [
                                    {name: Treemick.create(),level:1},
                                    {name: Droner.create(),level:2},
                                    {name: Bogslither.create(),level:14},
                                    {name: Rockmauler.create(),level:15},
                                ]
                                const matchups = await matchPlayers(team1,team2)
                                let logEmbed = new MessageEmbed()
                                .setTitle(`SQUAD BATTLES`)
                                .setColor('GREEN')
                                .setDescription(`Here are the Matchups for this SB:-\n\n${matchups[0].player1.name.name} VS ${matchups[0].player2.name.name}\n\n${matchups[1].player1.name.name} VS ${matchups[1].player2.name.name}\n\n${matchups[2].player1.name.name} VS ${matchups[2].player2.name.name}\n\n${matchups[3].player1.name.name} VS ${matchups[3].player2.name.name}\n\nInitiating Matches...`);
                                // const attacker = await Warrior.create(author)
                                // attacker.health=foundUser.health
                                // attacker.mana=foundUser.mana
                                // attacker.armor=foundUser.armour
                                // attacker.magicResistance = foundUser.magicResistance
                                // attacker.magicPower=foundUser.magicPower
                                // attacker.attackDamage=foundUser.attackDamage
                                // attacker.element = foundUser.elements[0].toLowerCase();
                                // attacker.evasion=foundUser.evasion
                                // attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                // attacker.passive_skills = foundUser.innate_passive.concat(foundUser.passiveskills)
                                // attacker.maxMana = foundUser.mana
                                // attacker.speed = foundUser.speed
                                // attacker.level = foundUser.level
                                // attacker.name = `${interaction.user.username} ${getEmoji(attacker.element)}`

                
                               
                                //     attacker.skills=foundUser.currentskills
                                
                                //     attacker.element = attacker.element.toLowerCase()
                                
                                await interaction.reply({embeds:[logEmbed]})
                                let i
                                let winners
                                for(i=0;i<matchups.length;i++){
                                    const player1 = matchups[i].player1.name
                                    const player2 = matchups[i].player2.name
                                    let winner
                                    if(player1.speed >= player2.speed){
                                         winner = await new PvEDuel_Test({
                                            interaction,
                                            player1: player1,
                                            player2: player2,
                                            speed:setspeed,
                                        }).start()
                                        
                                    }
                                    else{
                                         winner = await new PvEDuel_Test({
                                            interaction,
                                            player1: player2,
                                            player2: player1,
                                            speed:setspeed
                                        }).start()
                                    }
                                winners.push(winner)
                                
                                }
                            
                                let winEmbed = new MessageEmbed()
                                .setTitle(`SQUAD BATTLES`)
                                .setColor('GREEN')
                                .setDescription(`Here are the Winners for this SB:-\n\n${matchups[0].player1.name} VS ${matchups[0].player2.name} - ${winners[0]}\n\n${matchups[1].player1.name} VS ${matchups[1].player2.name} - ${winners[1]}\n\n${matchups[2].player1.name} VS ${matchups[2].player2.name} - ${winners[2]}\n\n${matchups[3].player1.name} VS ${matchups[3].player2.name} - ${winners[3]}`);
                               
                                interaction.editReply({embeds:[winEmbed]})

                            }
                        })
                    
                    
                      
                
                        
                   
        
            }

            else {
                    interaction.reply({content:"it seems that you are not an awakened yet!"})
                }
            }
        })

        
       
    }
)

let skills =[]
let skill_dmg = 0
let damage_order = []
let skill_order = []


export class PvEDuel_Test extends DuelBuilder {
    player1: any
    player2: any
    speed: number
    
    async beforeDuelStart() {
        
        
    }
    

    // async onSkillSelect(skillName: string) {
    //     skillName = 'Basic attack'
    //     const skill = allskills.find(skill => skill.name === skillName)

    //     this.attacker.useSkill(this.attacker,this.defender,skill)
    // }
    
    
    async onTurn(skipTurn: boolean,turn:number) {
        this.addLogMessage(`\n`) 
        this.addLogMessage(`**Turn: ${this.attacker.name}**\n`)
        const isMonsterTurn = this.attacker instanceof MonsterEntity
        if (skipTurn) {
            if (isMonsterTurn) {
                await sleep(this.speed)
                this.deleteInfoMessages()
            }

            return
        }
        
        if (this.attacker instanceof MonsterEntity) {
           this.attacker.mana += Math.round(this.attacker.maxMana/4)
           if(this.attacker.mana > this.attacker.maxMana){
            this.attacker.mana = this.attacker.maxMana
           }

            
            if(turn == 0 || turn==1){
                if(this.attacker.passive_skills.length !=0){
                    let i
                    for(i=0;i<this.attacker.passive_skills.length;i++){
                        const passive_skill = this.attacker.passive_skills[i]
                        this.attacker.useSkill(this.attacker,this.defender,passive_skill)
                        
                        
                    } 
                }
                
                let skill = this.attacker.skills.find(skill => (skill.type === "buff" || skill.type === "debuff") && skill.mana_cost<=this.attacker.mana)
                if(skill){
                    this.attacker.useSkill(this.attacker,this.defender,skill)
                    await sleep(this.speed)
                }
                else{
                    skills = this.attacker.skills
                    this.attacker.skills = []
                    damage_order = []
                for(let j=0;j<skills.length;j++){
                    
                    let val = skills[j]
                    if(val.type == "physical"){
                        skill_dmg = calculate.physicalDamage(val.damage*this.attacker.attackDamage,this.defender.armor)
                    }
                    else if(val.type == "magical"){
                        skill_dmg = calculate.magicDamage(val.damage*this.attacker.magicPower,this.defender.magicResistance)
                    }
                    
                    let mod = calculateModifier(val.element,this.defender.element.toLowerCase())
                    let stab = calculateSTAB(val.element,this.attacker.element.toLowerCase())
                    
                    skill_dmg = skill_dmg * mod * stab
                    damage_order.push(skill_dmg)
                    damage_order.sort(function(a,b){return a - b})
                    const index = damage_order.indexOf(skill_dmg)
                    this.attacker.skills.splice(index,0,val)
                    
                    
                    
                    
                    
    
                }
                this.attacker.skills.reverse()
                
                
                skill = this.attacker.skills.find(skill => skill.mana_cost <= this.attacker.mana)
                            if(skill){
                                this.attacker.useSkill(this.attacker,this.defender,skill)
                                await sleep(this.speed)
                            }
                            else{
                                this.attacker.useSkill(this.attacker,this.defender,sample(skills))
                                await sleep(this.speed)
                            }
               
                }
            }
            else if(this.attacker.health <= 0.5*this.attacker.maxHealth){
                let skill = this.attacker.skills.find(skill => skill.type === "heal" && skill.mana_cost<=this.attacker.mana)
                if(skill){
                        this.attacker.useSkill(this.attacker,this.defender,skill)
                        await sleep(this.speed)
                    
                   
                }
                else{
                    skills = this.attacker.skills
                    this.attacker.skills = []
                    damage_order = []
                for(let j=0;j<skills.length;j++){
                    
                    let val = skills[j]
                    if(val.type == "physical"){
                        skill_dmg = calculate.physicalDamage(val.damage*this.attacker.attackDamage,this.defender.armor)
                    }
                    else if(val.type == "magical"){
                        skill_dmg = calculate.magicDamage(val.damage*this.attacker.magicPower,this.defender.magicResistance)
                    }
                    
                    let mod = calculateModifier(val.element,this.defender.element.toLowerCase())
                    let stab = calculateSTAB(val.element,this.attacker.element.toLowerCase())
                    
                    skill_dmg = skill_dmg * mod * stab
                    damage_order.push(skill_dmg)
                    damage_order.sort(function(a,b){return a - b})
                    const index = damage_order.indexOf(skill_dmg)
                    this.attacker.skills.splice(index,0,val)
                    
                    

                }
                this.attacker.skills.reverse()
                  
                skill = this.attacker.skills.find(skill => skill.mana_cost <= this.attacker.mana)
                            if(skill){
                                this.attacker.useSkill(this.attacker,this.defender,skill)
                                await sleep(this.speed)
                            }
                            else{
                                this.attacker.useSkill(this.attacker,this.defender,sample(skills))
                                await sleep(this.speed)
                            }
               
                }
                }
            
            else{
                skills = this.attacker.skills
                this.attacker.skills = []
                damage_order = []
            for(let j=0;j<skills.length;j++){
                
                let val = skills[j]
                if(val.type == "physical"){
                    skill_dmg = calculate.physicalDamage(val.damage*this.attacker.attackDamage,this.defender.armor)
                }
                else if(val.type == "magical"){
                    skill_dmg = calculate.magicDamage(val.damage*this.attacker.magicPower,this.defender.magicResistance)
                }
                
                let mod = calculateModifier(val.element,this.defender.element.toLowerCase())
                let stab = calculateSTAB(val.element,this.attacker.element.toLowerCase())
                    
                skill_dmg = skill_dmg * mod * stab
                damage_order.push(skill_dmg)
                damage_order.sort(function(a,b){return a - b})
                const index = damage_order.indexOf(skill_dmg)
                this.attacker.skills.splice(index,0,val)
                
                

            }
            this.attacker.skills.reverse()
              
            let skill = this.attacker.skills.find(skill => skill.mana_cost <= this.attacker.mana)
                        if(skill){
                            this.attacker.useSkill(this.attacker,this.defender,skill)
                            await sleep(this.speed)
                        }
                        else{
                            this.attacker.useSkill(this.attacker,this.defender,sample(skills))
                            await sleep(this.speed)
                        }
               
            }
               
            
            
        } 
        else {
            this.attacker.mana += Math.round(this.attacker.maxMana/4)
           if(this.attacker.mana > this.attacker.maxMana){
            this.attacker.mana = this.attacker.maxMana
           }
           if(turn == 15 || turn == 16){
            await this.deleteInfoMessages()
           }
            
            // const max = this.skill_len
            
            // const min = 0
            // const skillName = this.attacker.skills[Math.floor(Math.random() * max)].name
            // console.log(skillName);
            
            // const skill = allskills.find(skill => skill.name === skillName)
    
            // this.attacker.useSkill(this.attacker,this.defender,skill)
            // await sleep(1.5)
            
            if(turn == 0 || turn==1){
                let skills = this.attacker.skills
                this.attacker.skills=[]
                damage_order = []
                for(let j=0;j<skills.length;j++){
                    
                    let val = allskills.find(skill => skill.name === skills[j].name)
                    if(val.type == "physical"){
                        skill_dmg = calculate.physicalDamage(val.damage*this.attacker.attackDamage,this.defender.armor)
                    }
                    else if(val.type == "magical"){
                        skill_dmg = calculate.magicDamage(val.damage*this.attacker.magicPower,this.defender.magicResistance)
                    }
                    
                    let mod = calculateModifier(val.element,this.defender.element)
                    let stab = calculateSTAB(val.element,this.attacker.element.toLowerCase())
                    
                    skill_dmg = skill_dmg * mod * stab
                    damage_order.push(skill_dmg)
                    damage_order.sort(function(a,b){return a - b})
                    const index = damage_order.indexOf(skill_dmg)
                    this.attacker.skills.splice(index,0,val)
                    
                    

                }
                this.attacker.skills.reverse()
                  

                if(this.attacker.passive_skills.length !=0){
                    let i
                    
                    for(i=0;i<this.attacker.passive_skills.length;i++){
                        const passive_skill = await passive_skills.find(skill => skill.name === this.attacker.passive_skills[i].name)
                        this.attacker.useSkill(this.attacker,this.defender,passive_skill)
                        
                        
                    } 
                }
                
            }
            if(turn == 0 || turn==1){
                let skill = this.attacker.skills.find(skill => skill.type === "buff" && skill.mana_cost<=this.attacker.mana)
                if(skill){
                    this.attacker.useSkill(this.attacker,this.defender,skill)
                    await sleep(this.speed)
                }
                else{
                    
                    
                        skill = this.attacker.skills.find(skill => skill.mana_cost <= this.attacker.mana)
                                if(skill){
                                    this.attacker.useSkill(this.attacker,this.defender,skill)
                                    await sleep(this.speed)
                                }
                                else{
                                    this.attacker.useSkill(this.attacker,this.defender,sample(skills))
                                    await sleep(this.speed)
                                }
                               
                       
            
                        
                    

                }
            }
            else if(this.attacker.health <= 0.5*this.attacker.maxHealth){
                let skill = this.attacker.skills.find(skill => skill.type === "heal" && skill.mana_cost<=this.attacker.mana)
                if(skill){
                    
                        this.attacker.useSkill(this.attacker,this.defender,skill)
                        await sleep(this.speed)
                    
                   
                }
                else{
                skills = this.attacker.skills
                this.attacker.skills=[]
                damage_order = []
                for(let j=0;j<skills.length;j++){
                    
                    let val = allskills.find(skill => skill.name === skills[j].name)
                    if(val.type == "physical"){
                        skill_dmg = calculate.physicalDamage(val.damage*this.attacker.attackDamage,this.defender.armor)
                    }
                    else if(val.type == "magical"){
                        skill_dmg = calculate.magicDamage(val.damage*this.attacker.magicPower,this.defender.magicResistance)
                    }
                    
                    let mod = calculateModifier(val.element,this.defender.element)
                    let stab = calculateSTAB(val.element,this.attacker.element.toLowerCase())
                    
                    skill_dmg = skill_dmg * mod * stab
                    damage_order.push(skill_dmg)
                    damage_order.sort(function(a,b){return a - b})
                    const index = damage_order.indexOf(skill_dmg)
                    this.attacker.skills.splice(index,0,val)
                    
                    

                }
                this.attacker.skills.reverse()
                  
                    skill = this.attacker.skills.find(skill => skill.mana_cost <= this.attacker.mana)
                            if(skill){
                                this.attacker.useSkill(this.attacker,this.defender,skill)
                                await sleep(this.speed)
                            }
                            else{
                                this.attacker.useSkill(this.attacker,this.defender,sample(skills))
                                await sleep(this.speed)
                            }
                           
                   
                }
            }
            else{
                skills = this.attacker.skills
                this.attacker.skills=[]
                damage_order = []
                for(let j=0;j<skills.length;j++){
                    
                    let val = allskills.find(skill => skill.name === skills[j].name)
                    if(val.type == "physical"){
                        skill_dmg = calculate.physicalDamage(val.damage*this.attacker.attackDamage,this.defender.armor)
                    }
                    else if(val.type == "magical"){
                        skill_dmg = calculate.magicDamage(val.damage*this.attacker.magicPower,this.defender.magicResistance)
                    }
                    
                    let mod = calculateModifier(val.element,this.defender.element)
                    let stab = calculateSTAB(val.element,this.attacker.element.toLowerCase())
                    
                    skill_dmg = skill_dmg * mod * stab
                    damage_order.push(skill_dmg)
                    damage_order.sort(function(a,b){return a - b})
                    const index = damage_order.indexOf(skill_dmg)
                    this.attacker.skills.splice(index,0,val)
                    
                    

                }
                this.attacker.skills.reverse()
                  
                let skill = this.attacker.skills.find(skill => skill.mana_cost <= this.attacker.mana)
                            if(skill){
                                this.attacker.useSkill(this.attacker,this.defender,skill)
                                await sleep(this.speed)
                            }
                            else{
                                this.attacker.useSkill(this.attacker,this.defender,sample(skills))
                                await sleep(this.speed)
                            }
                           
               
            }
                
            
            
            
        
             
            
            
        }

        
        
    }

    async start() {
        await this.beforeDuelStart()

        while (!(this.player1.isDead() || this.player2.isDead()) && !this.run) {
            const skipTurn = await this.scheduler.run(this.attacker, this.defender)

            await this.onTurn(skipTurn,this.turn)
            
            const a = this.attacker
            const b = this.defender

            this.attacker = b
            this.defender = a

            this.turn += 1
        }
        
        
        

        const winner = this.player1.isDead() ? this.player2 : this.player1
        const loser = this.player1.isDead() ? this.player1 : this.player2
        
       return winner.name
        
    }
    
}




export function calculateModifier(skill_element: string,defender_element: string){
    let mod = 1
    if(skill_element == null){
        mod = 1
    }
else if(skill_element == "flame"){
        
if(defender_element == "flame"){
mod  = 0.5
}
else if(defender_element == "light"){
mod  = 0.5
}
else if(defender_element == "volt"){
mod  = 1
}
else if(defender_element == "wave"){
mod  = 0.5
}
else if(defender_element == "frost"){
mod  = 2
}
else if(defender_element == "gale"){
mod  = 2
}
else if(defender_element == "bloom"){
mod  = 2
}
else if(defender_element == "terra"){
mod  = 0.5
}
else if(defender_element == "alloy"){
mod  = 2
}
else if(defender_element == "venom"){
mod  = 1
}
else if(defender_element == "draco"){
mod  = 0.5
}
else if(defender_element == "ruin"){
mod  = 1
}
}
else if(skill_element == "alloy"){
if(defender_element == "flame"){
    mod  = 0.5
}
else if(defender_element == "light"){
    mod  = 2
}
else if(defender_element == "volt"){
    mod  = 0.5
}
else if(defender_element == "wave"){
    mod  = 0.5
}
else if(defender_element == "frost"){
    mod  = 2
}
else if(defender_element == "gale"){
    mod  = 1
}
else if(defender_element == "bloom"){
    mod  = 1
}
else if(defender_element == "terra"){
    mod  = 2
}
else if(defender_element == "alloy"){
    mod  = 0.5
}
else if(defender_element == "venom"){
    mod  = 1
}
else if(defender_element == "draco"){
    mod  = 1
}
else if(defender_element == "ruin"){
    mod  = 1
}
}
else if(skill_element == "bloom"){
    if(defender_element == "flame"){
        mod  = 0.5
    }
    else if(defender_element == "light"){
        mod  = 1
    }
    else if(defender_element == "volt"){
        mod  = 1
    }
    else if(defender_element == "wave"){
        mod  = 2
    }
    else if(defender_element == "frost"){
        mod  = 0.5
    }
    else if(defender_element == "gale"){
        mod  = 0.5
    }
    else if(defender_element == "bloom"){
        mod  = 0.5
    }
    else if(defender_element == "terra"){
        mod  = 2
    }
    else if(defender_element == "alloy"){
        mod  = 0.5
    }
    else if(defender_element == "venom"){
        mod  = 0.5
    }
    else if(defender_element == "draco"){
        mod  = 0.5
    }
    else if(defender_element == "ruin"){
        mod  = 1
    }
}
else if(skill_element == "frost"){
    if(defender_element == "flame"){
        mod  = 0.5
    }
    else if(defender_element == "light"){
        mod  = 1
    }
    else if(defender_element == "volt"){
        mod  = 1
    }
    else if(defender_element == "wave"){
        mod  = 2
    }
    else if(defender_element == "frost"){
        mod  = 0.5
    }
    else if(defender_element == "gale"){
        mod  = 2
    }
    else if(defender_element == "bloom"){
        mod  = 2
    }
    else if(defender_element == "terra"){
        mod  = 1
    }
    else if(defender_element == "alloy"){
        mod  = 0.5
    }
    else if(defender_element == "venom"){
        mod  = 2
    }
    else if(defender_element == "draco"){
        mod  = 2
    }
    else if(defender_element == "ruin"){
        mod  = 1
    }
}
else if(skill_element == "gale"){
    if(defender_element == "flame"){
        mod  = 0.5
    }
    else if(defender_element == "light"){
        mod  = 1
    }
    else if(defender_element == "volt"){
        mod  = 0.5
    }
    else if(defender_element == "wave"){
        mod  = 1
    }
    else if(defender_element == "frost"){
        mod  = 0.5
    }
    else if(defender_element == "gale"){
        mod  = 0.5
    }
    else if(defender_element == "bloom"){
        mod  = 2
    }
    else if(defender_element == "terra"){
        mod  = 1
    }
    else if(defender_element == "alloy"){
        mod  = 0.5
    }
    else if(defender_element == "venom"){
        mod  = 1
    }
    else if(defender_element == "draco"){
        mod  = 0.5
    }
    else if(defender_element == "ruin"){
        mod  = 1
    }
}
else if(skill_element == "light"){
    if(defender_element == "flame"){
        mod  = 2
    }
    else if(defender_element == "light"){
        mod  = 1
    }
    else if(defender_element == "volt"){
        mod  = 1
    }
    else if(defender_element == "wave"){
        mod  = 1
    }
    else if(defender_element == "frost"){
        mod  = 1
    }
    else if(defender_element == "gale"){
        mod  = 1
    }
    else if(defender_element == "bloom"){
        mod  = 0.5
    }
    else if(defender_element == "terra"){
        mod  = 1
    }
    else if(defender_element == "alloy"){
        mod  = 0.5
    }
    else if(defender_element == "venom"){
        mod  = 2
    }
    else if(defender_element == "draco"){
        mod  = 2
    }
    else if(defender_element == "ruin"){
        mod  = 2
    }
}
else if(skill_element == "venom"){
    if(defender_element == "flame"){
        mod  = 1
    }
    else if(defender_element == "light"){
        mod  = 0.5
    }
    else if(defender_element == "volt"){
        mod  = 1
    }
    else if(defender_element == "wave"){
        mod  = 1
    }
    else if(defender_element == "frost"){
        mod  = 1
    }
    else if(defender_element == "gale"){
        mod  = 1
    }
    else if(defender_element == "bloom"){
        mod  = 2
    }
    else if(defender_element == "terra"){
        mod  = 2
    }
    else if(defender_element == "alloy"){
        mod  = 2
    }
    else if(defender_element == "venom"){
        mod  = 0.5
    }
    else if(defender_element == "draco"){
        mod  = 0.5
    }
    else if(defender_element == "ruin"){
        mod  = 1
    }
}
else if(skill_element == "terra"){
    if(defender_element == "flame"){
        mod  = 2
    }
    else if(defender_element == "light"){
        mod  = 1
    }
    else if(defender_element == "volt"){
        mod  = 0.5
    }
    else if(defender_element == "wave"){
        mod  = 0.5
    }
    else if(defender_element == "frost"){
        mod  = 1
    }
    else if(defender_element == "gale"){
        mod  = 1
    }
    else if(defender_element == "bloom"){
        mod  = 0.5
    }
    else if(defender_element == "terra"){
        mod  = 1
    }
    else if(defender_element == "alloy"){
        mod  = 2
    }
    else if(defender_element == "venom"){
        mod  = 2
    }
    else if(defender_element == "draco"){
        mod  = 1
    }
    else if(defender_element == "ruin"){
        mod  = 1
    }
}
else if(skill_element == "volt"){
    if(defender_element == "flame"){
        mod  = 1
    }
    else if(defender_element == "light"){
        mod  = 0.5
    }
    else if(defender_element == "volt"){
        mod  = 0.5
    }
    else if(defender_element == "wave"){
        mod  = 2
    }
    else if(defender_element == "frost"){
        mod  = 1
    }
    else if(defender_element == "gale"){
        mod  = 2
    }
    else if(defender_element == "bloom"){
        mod  = 0.5
    }
    else if(defender_element == "terra"){
        mod  = 0.5
    }
    else if(defender_element == "alloy"){
        mod  = 2
    }
    else if(defender_element == "venom"){
        mod  = 1
    }
    else if(defender_element == "draco"){
        mod  = 0.5
    }
    else if(defender_element == "ruin"){
        mod  = 1
    }
}
else if(skill_element == "wave"){
    if(defender_element == "flame"){
        mod  = 2
    }
    else if(defender_element == "light"){
        mod  = 1
    }
    else if(defender_element == "volt"){
        mod  = 1
    }
    else if(defender_element == "wave"){
        mod  = 0.5
    }
    else if(defender_element == "frost"){
        mod  = 0.5
    }
    else if(defender_element == "gale"){
        mod  = 1
    }
    else if(defender_element == "bloom"){
        mod  = 0.5
    }
    else if(defender_element == "terra"){
        mod  = 2
    }
    else if(defender_element == "alloy"){
        mod  = 2
    }
    else if(defender_element == "venom"){
        mod  = 1
    }
    else if(defender_element == "draco"){
        mod  = 0.5
    }
    else if(defender_element == "ruin"){
        mod  = 1
    }
}
else{
    mod = 1
}
return mod
}

export function calculateSTAB(skill_element: string,attacker_element: string){
    let stab = 1
    if(skill_element == attacker_element){
        stab = 1.2
    }
    return stab
}

export function getEmoji(element:string){
    let user_emoji
    if(element == "flame"){
        user_emoji = emoji.FLAME
    }
    else if(element == "wave"){
        user_emoji = emoji.WAVE
    }
    else if(element == "volt"){
        user_emoji = emoji.VOLT
    }
    else if(element == "venom"){
        user_emoji = emoji.VENOM
    }
    else if(element == "terra"){
        user_emoji = emoji.TERRA
    }
    else if(element == "frost"){
        user_emoji = emoji.FROST
    }
    else if(element == "bloom"){
        user_emoji = emoji.BLOOM
    }
    else if(element == "alloy"){
        user_emoji = emoji.ALLOY
    }
    else if(element == "gale"){
        user_emoji = emoji.GALE
    }
    else if(element == "draco"){
        user_emoji = emoji.DRACO
    }
    else if(element == "ruin"){
        user_emoji = emoji.RUIN
    }
    else if(element == "light"){
        user_emoji = emoji.LIGHT
    }
    return user_emoji
}

async function matchPlayers(array1, array2) {
    // Sort both arrays by player level in ascending order
    const sortedArray1 = array1.slice().sort((a, b) => a.level - b.level);
    const sortedArray2 = array2.slice().sort((a, b) => a.level - b.level);

    const matchups = [];

    let index1 = 0;
    let index2 = 0;

    while (index1 < sortedArray1.length && index2 < sortedArray2.length) {
        const player1 = sortedArray1[index1];
        const player2 = sortedArray2[index2];

        // Calculate the absolute difference in levels between two players
        const levelDifference = Math.abs(player1.level - player2.level);

        // Add the matchup to the result
        matchups.push({ player1, player2 });

        // Move to the next player in the array with the smaller level difference
        if (player1.level < player2.level) {
            index1++;
        } else if (player1.level > player2.level) {
            index2++;
        } else {
            // If levels are equal, move both indices
            index1++;
            index2++;
        }
    }

    // Handle any remaining unmatched players
    while (index1 < sortedArray1.length) {
        const player1 = sortedArray1[index1];
        matchups.push({ player1, player2: null });
        index1++;
    }

    while (index2 < sortedArray2.length) {
        const player2 = sortedArray2[index2];
        matchups.push({ player1: null, player2 });
        index2++;
    }

    return matchups;
}