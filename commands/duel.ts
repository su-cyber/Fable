import { SlashCommandUserOption } from '@discordjs/builders'
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { MonsterEntity, Entity } from '../src/age/classes'
import { Warrior } from '../src/age/heroes/warrior'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/skills/skills'
import { sleep } from '../src/utils'
import inventory from '../models/InventorySchema'
import getHealth from '../src/utils/getHealth'
import sample from 'lodash.sample'
import passive_skills from '../src/age/heroes/passive_skills'
import { calculate } from '../src/age/classes'
import { MessageEmbed } from 'discord.js'
import { MessageActionRow, MessageButton } from 'discord.js'

export default new MyCommandSlashBuilder({ name: 'duel', description: 'Duel with a player' })
    .addUserOption((option: SlashCommandUserOption) =>
        option.setName('user').setDescription('Player to duel with').setRequired(true)
    )
    .setDo(async (bot, interaction) => {
        const authorId = interaction.user.id
        const opponentId = interaction.options.getUser('user').id

        const author = await bot.users.fetch(authorId)
        const opponent = await bot.users.fetch(opponentId)

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.exists({userID: opponentId},async function(err,result){

                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            if(result){
                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("accept").setStyle("SUCCESS").setLabel("ACCEPT"),
                                    new MessageButton().setCustomId("reject").setStyle("DANGER").setLabel("REJECT"),
                                    
                                ])

                                let consentEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('DUEL REQUEST')
                                .setDescription(`${author.username} has requested ${opponent.username} for a friendly Duel!\n\n**What will you do ${opponent.username}?**`)
                                await interaction.reply({embeds:[consentEmbed],components:[btnraw]})
                                let filter = i => i.user.id === opponentId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter})

                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            
                                const attacker = Warrior.create(author)
                                const defender = Warrior.create(opponent)
                                 profileModel.findOne({userID:authorId},async function(err,foundUser) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        
                                attacker.health=getHealth(foundUser.level,foundUser.vitality)
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicPower=foundUser.magicPower
                                attacker.element = foundUser.elements[0].toLowerCase()
                                attacker.attackDamage=foundUser.attackDamage
                                attacker.magicResistance = foundUser.magicResistance
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
                                    attacker.element = attacker.element.toLowerCase()
                                
                                    }
                                })
                                profileModel.findOne({userID:opponentId},async function(err,foundUser) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        defender.health=getHealth(foundUser.level,foundUser.vitality)
                                        defender.mana=foundUser.mana
                                        defender.armor=foundUser.armour
                                        defender.magicPower=foundUser.magicPower
                                        defender.element = foundUser.elements[0].toLowerCase()
                                        defender.attackDamage=foundUser.attackDamage
                                        defender.magicResistance = foundUser.magicResistance
                                        defender.evasion=foundUser.evasion
                                        defender.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                        defender.passive_skills = foundUser.passiveskills
                                        defender.maxMana = foundUser.mana
                                        defender.speed = foundUser.speed
                                        
                                        inventory.findOne({userID:authorId},async function(err,foundProfile) {
                                            if(foundProfile.inventory.potions.length !=0){
                                                defender.potions = []
                                                for(let i=0;i<foundProfile.inventory.potions.length;i++){
                                                    
                                                    defender.potions.push(foundProfile.inventory.potions[i].name)
                                                            }
                        
                                                
                                            }
                                            else{
                                                defender.potions =[]
                                            }
                                        })
                        
                                       
                                        defender.skills=foundUser.currentskills
                                        defender.element = defender.element.toLowerCase()
                                        
                                    }
                                })
                                console.log(attacker.speed);
                                console.log(defender.speed);
                                
                                
                                if(attacker.speed >= defender.speed){
                                    await new PvPDuel({
                                        interaction,
                                        player1: attacker,
                                        player2: defender,
                                        speed:2.5
                                    }).start()
                                }
                                else{
                                    await new PvPDuel({
                                        interaction,
                                        player1: defender,
                                        player2: attacker,
                                        speed:2.5
                                    }).start()
                                }
                                    
                                        }
                                        else if(btn.customId === "reject"){
                                            await btn.deferUpdate().catch(e => {})
                                            interaction.editReply({content:`${opponent.username} rejected the Duel Request!`,embeds:[],components:[]})
                                        }
                                        
                                        
                                        
                                    }
                                
                            
                            
                            
                            })
                            
                           
                            
                                
                            
                                
                                
                        
                            }
                            else{
                                interaction.reply({content:"it seems that the user you selected is not an awakened yet!",ephemeral:true})
                            }
                        }
                    })

                    
                }
                else{
                    interaction.reply({content:"it seems that you are not an awakened yet!",ephemeral:true})
                }
            }

        })
        
        
        
        


        
    })
    let skills =[]
    let skill_dmg = 0
    let damage_order = []

class PvPDuel extends DuelBuilder {
    player1: any
    player2: any
    speed:number

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

    async beforeDuelStart() {
        super.beforeDuelStart()

        await this.replyOrEdit({ content: `initiating duel with ${this.player2.name}!`,embeds:[],components:[]})
        await sleep(1.2)
        
        
    }
    async onSkillSelect(skillName: string) {
        const skill = allskills.find(skill => skill.name === skillName)

        this.attacker.useSkill(this.attacker,this.defender,skill)
    }

    async onEnd(winner: Entity, loser: Entity) {
        await this.interaction.channel.send(`🏆 **${winner.name}** won!`)
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