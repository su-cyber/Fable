import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/skills/skills'
import passive_skills from '../src/age/heroes/passive_skills'
import inventory from '../models/InventorySchema'
import sample from 'lodash.sample'
import { SlashCommandIntegerOption} from '@discordjs/builders'
import getHealth from '../src/utils/getHealth'
import { Client, Interaction, MessageEmbed } from 'discord.js'
import { calculate } from '../src/age/classes'
import hunting_contracts from '../src/utils/allHuntingContracts'
import { Bot } from '../src/bot'

export default new MyCommandSlashBuilder({ name: 'fight', description: 'fight with an encounter' })
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
        const setspeed = interaction.options.getInteger('speed')
        
        
        
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    if(interaction.guild == null){
                        profileModel.findOne({userID:authorId},async function(err,foundUser){
                            if(foundUser.energy <= 0){
                                interaction.reply({content:`You cannot move as you dont have any energy left!You can view your current energy in your Keystone Grimoire and you regain 1 energy every 1 hour in real-time.Every battle costs 1 energy and energy is needed to move inside dungeons but is only spent if you engage in a battle`,ephemeral:true})
                                foundUser.encounter = []
                                await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                            }
                            else{
                                const attacker = Warrior.create(author)
                                attacker.health=foundUser.health
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicResistance = foundUser.magicResistance
                                attacker.magicPower=foundUser.magicPower
                                attacker.attackDamage=foundUser.attackDamage
                                attacker.element = foundUser.elements[0].toLowerCase()
                                attacker.evasion=foundUser.evasion
                                attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                attacker.passive_skills = foundUser.passiveskills
                                attacker.maxMana = foundUser.mana
                                attacker.speed = foundUser.speed
                                
                                inventory.findOne({userID:authorId},async function(err,foundProfile) {
                                    if(foundProfile.inventory.potions.length !=0){
                                        attacker.potions = []
                                        for(let i=0;i<foundProfile.inventory.potions.length;i++){
                                            
                                            attacker.potions.push(foundProfile.inventory.potions[i].name)
                                                    }
                
                                        
                                    }
                                    else{
                                        attacker.potions =[]
                                    }
                                })
                
                               
                                    attacker.skills=foundUser.currentskills
                                
                                
                                    
                                   
                                
                
                                
                                
                                
                            
                
                           
                                
                                
                                
                    
                
                               
                
                                
                
                                
                                 
                                    
                                    
                            if(foundUser.encounter.length != 0){
                               if(foundUser.location == "tutorial"){
                                if(foundUser.location == foundUser.encounter[0].location || foundUser.city_town == foundUser.encounter[0].location){
                                    const monster = await (await getMonsters(foundUser.location))
                                .find(m => m.name === foundUser.encounter[0].name)
                                .create()
                    
                    if(attacker.speed >= monster.speed){
                        await new PvEDuel({
                            interaction,
                            player1: attacker,
                            player2: monster,
                            speed:setspeed,
                        }).start()
                        
                    }
                    else{
                        await new PvEDuel({
                            interaction,
                            player1: monster,
                            player2: attacker,
                            speed:setspeed
                        }).start()
                    }
                                }
                                else{
                                    interaction.reply({content:`you are not in ${foundUser.encounter[0].location} where you encountered ${foundUser.encounter[0].name}`,ephemeral:true})
                                }
                               }
                               else{
                                const timestamp = Date.now()
                
                                if(timestamp - foundUser.encounter[0].time <= 2*60*1000){
                                    if(foundUser.location == foundUser.encounter[0].location || foundUser.city_town == foundUser.encounter[0].location){
                                        const monster = (await getMonsters(foundUser.encounter[0].location)).map(fn => fn.create())
                                    .find(m => m.name === foundUser.encounter[0].name)
                                    
                        
                        if(attacker.speed >= monster.speed){
                            await new PvEDuel({
                                interaction,
                                player1: attacker,
                                player2: monster,
                                speed:setspeed,
                            }).start()
                            
                        }
                        else{
                            await new PvEDuel({
                                interaction,
                                player1: monster,
                                player2: attacker,
                                speed:setspeed
                            }).start()
                        }
                                    }
                                    else{
                                        interaction.reply(`you are not in ${foundUser.encounter[0].location} where you encountered ${foundUser.encounter[0].name}`)
                                    }
                                }
                                else{
                                    interaction.reply({content:`you responded too late, your encounter is lost`,ephemeral:true})
                                    const authorID = interaction.user.id
                                    profileModel.findOne({userID:authorID},async function(err,foundUser) {
                            
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            foundUser.encounter = []
                                            await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter})
                            
                                        }
                                    })
                                }
                               }
                
                            }
                            else{
                                await interaction.reply({content:`you have not encountered anything!`,ephemeral:true})
                                
                                
                            }
                                        
                                        
                                    
                                
                             
                                
                                
                    
                       
                        
                        
                            }
                        })
                    }
                    else{
                        interaction.reply(`You can only fight in DMs`)
                    }
                    
                      
                
                        
                   
        
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


export class PvEDuel extends DuelBuilder {
    player1: any
    player2: any
    speed: number
    
    async beforeDuelStart() {
        super.beforeDuelStart()
        if(this.attacker instanceof MonsterEntity){
            await this.replyOrEdit({ content: `starting combat with ${this.player1.name}!`,components:[],embeds:[]})
        }
        else{
            await this.replyOrEdit({ content: `starting combat with ${this.player2.name}!`,components:[],embeds:[] })
        }
       
        await sleep(1.2)
        
        
    }
    

    // async onSkillSelect(skillName: string) {
    //     skillName = 'Basic attack'
    //     const skill = allskills.find(skill => skill.name === skillName)

    //     this.attacker.useSkill(this.attacker,this.defender,skill)
    // }
    
    
    async onTurn(skipTurn: boolean,turn:number) {
        const isMonsterTurn = this.attacker instanceof MonsterEntity

        if (skipTurn) {
            if (isMonsterTurn) {
                await sleep(this.speed)
                this.deleteInfoMessages()
            }

            return
        }
        
        if (this.attacker instanceof MonsterEntity) {
            
           
            await this.sendInfoMessage(this.attacker.skills, true)

            
            if(turn == 0 || turn==1){
                if(this.attacker.passive_skills.length !=0){
                    let i
                    for(i=0;i<this.attacker.passive_skills.length;i++){
                        const passive_skill = passive_skills.find(skill => skill.name === this.attacker.passive_skills[i].name)
                        this.attacker.useSkill(this.attacker,this.defender,passive_skill)
                        
                        
                    } 
                }
                
                let skill = this.attacker.skills.find(skill => skill.type === "buff" && skill.mana_cost<=this.attacker.mana)
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
                    
                    let mod = calculateModifier(val.element,this.defender.element)
                    skill_dmg = skill_dmg * mod
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
                    
                    let mod = calculateModifier(val.element,this.defender.element)
                    skill_dmg = skill_dmg * mod
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
                
                let mod = calculateModifier(val.element,this.defender.element)
                skill_dmg = skill_dmg * mod
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
           
            await this.sendInfoMessage(this.attacker.skills, true)
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
                    skill_dmg = skill_dmg * mod
                    damage_order.push(skill_dmg)
                    damage_order.sort(function(a,b){return a - b})
                    const index = damage_order.indexOf(skill_dmg)
                    this.attacker.skills.splice(index,0,val)
                    
                    

                }
                this.attacker.skills.reverse()
                  

                if(this.attacker.passive_skills.length !=0){
                    let i
                    for(i=0;i<this.attacker.passive_skills.length;i++){
                        const passive_skill = passive_skills.find(skill => skill.name === this.attacker.passive_skills[i].name)
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
                    skill_dmg = skill_dmg * mod
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
                    skill_dmg = skill_dmg * mod
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

        await this.sendInfoMessage(this.attacker.skills,true)
        
    }

    async onEnd(winner: any, loser: any) {
    await this.sendInfoMessage(this.attacker.skills,true)
       const authorID = this.interaction.user.id
       var user = this.interaction.user
        profileModel.findOne({userID:authorID},async function(err,foundUser) {
            
            if(err){
                console.log(err);
                
            }
            else{
                let i
                foundUser.encounter = []
                foundUser.energy-=1
                if(foundUser.status_effects.status.length != 0){
                    foundUser.status_effects.turns-=1
                if(foundUser.status_effects.turns==0){
                    for(i=0;i<foundUser.status_effects.status.length;i++){
                        if(foundUser.status_effects.status[i] == "Attack"){
                            foundUser.attackDamage-=foundUser.status_effects.value[i]
                        }
                        else if(foundUser.status_effects.status[i] == "Speed"){
                            foundUser.speed-=foundUser.status_effects.value[i]
                        }
                        else if(foundUser.status_effects.status[i] == "Armour"){
                            foundUser.armour-=foundUser.status_effects.value[i]
                        }
                        else if(foundUser.status_effects.status[i] == "Evasion-percent"){
                            foundUser.evasion=foundUser.evasion/(1+foundUser.status_effects.value[i])
                        }
                        else if(foundUser.status_effects.status[i] == "Evasion"){
                            foundUser.evasion-=foundUser.status_effects.value[i]
                        }
                    }
                    foundUser.status_effects.status = []
                    foundUser.status_effects.value = []
                }
                }
                
                

                
                await profileModel.updateOne({userID:authorID},foundUser)
                if(winner.id == authorID){
                    
                    await profileModel.updateOne({userID:authorID},{health:winner.health})
                    if(foundUser.quest_mob == loser.name && foundUser.quest_quantity>0){
                        foundUser.quest_quantity -=1
                        if(foundUser.quest_quantity == 0){
                            const foundContract = hunting_contracts.find(quest => quest.quest_id == foundUser.quest)
                            let huntEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('HUNT COMPLETED')
                            .setDescription(`You have Successfully Completed the Hunting Contract!\n\n Obtained ${foundContract.rewards.coins}🪙!\nObtained ${foundContract.rewards.merit} Merit!`)

                            await user.send({embeds:[huntEmbed]})
                            foundUser.quest = "None"
                            foundUser.quest_mob = "None"
                            foundUser.merit+=foundContract.rewards.merit
                            foundUser.coins+=foundContract.rewards.coins
                            foundUser.completed_quests.push(foundContract.quest_id)
                        }
                        await profileModel.updateOne({userID:authorID},{quest_quantity:foundUser.quest_quantity,quest_mob:foundUser.quest_mob,quest:foundUser.quest,coins:foundUser.coins,merit:foundUser.merit,completed_quests:foundUser.completed_quests})
                    }
                }
                else{
                    foundUser.location = "None"
                    foundUser.dungeon.status = false
                    foundUser.dungeon.name = ""
                    foundUser.dungeon.step = 0
                    await profileModel.updateOne({userID:authorID},{health:Math.round(0.1*loser.maxHealth),location:foundUser.location,dungeon:foundUser.dungeon})
                
                }
                
                    

            }
        })
        await loser.onDeath(this.interaction, winner)
    }

    
}


class PvEDuel_Quest extends PvEDuel {
    player1: Entity
    player2: MonsterEntity

    
    async onEnd(winner: Entity, loser: MonsterEntity) {
        const authorId = this.interaction.user.id
        profileModel.findOne({userID:authorId},async function(err,foundUser){
        if(winner.name != foundUser.quest_mob){
            
            
                const finalValue = foundUser.quest_quantity - 1
                await profileModel.updateOne({userID:authorId},{quest_quantity: finalValue})
                if(finalValue === 0){
                    
                    await profileModel.updateOne({userID:authorId},{quest: false})
                }

           
            
        }
    })
        await loser.onDeath(this.interaction, winner)
        
    }

}

function calculateModifier(skill_element: string,defender_element: string){
    let mod
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