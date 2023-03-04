import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep, weightedRandom } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'
import { getRandomMonster } from '../src/age/monsters'
import { getRandomFlora } from '../src/age/flora'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/heroes/skills'
import passive_skills from '../src/age/heroes/passive_skills'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import specialModel from '../models/specialSchema'
import sample from 'lodash.sample'
import { SlashCommandIntegerOption, SlashCommandUserOption } from '@discordjs/builders'

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
        const author = await bot.users.fetch(authorId)
        const guildID = interaction.guildId;
        const setspeed = interaction.options.getInteger('speed')
        
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    
                        const attacker = Warrior.create(author)
                        profileModel.findOne({userID:authorId},async function(err,foundUser) {
                            
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                            
                                attacker.health=foundUser.health
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicPower=foundUser.magicPower
                                attacker.attackDamage=foundUser.attackDamage
                                attacker.evasion=foundUser.evasion
                                attacker.maxHealth=foundUser.health
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
                                
                                
                                    
                                   
                                
                
                                
                                
                                
                            }
                
                           
                                
                                
                                
                    
                
                               
                
                                
                
                                
                                 
                                    
                                    
                            if(foundUser.encounter.length != 0){
                               const timestamp = new Date()
                
                                if(foundUser.encounter[0].time.getMonth() == timestamp.getMonth()){
                                    if(foundUser.encounter[0].time.getDay() == timestamp.getDay()){
                                        if(foundUser.encounter[0].time.getHours() == timestamp.getHours()){
                                            if((timestamp.getMinutes() - foundUser.encounter[0].time.getMinutes()) < 2){
                                                if(foundUser.location == foundUser.encounter[0].location){
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
                                                    interaction.reply(`you are not in ${foundUser.encounter[0].location} where you encountered ${foundUser.encounter[0].name}`)
                                                }
                                                
                                            }
                                            else{
                                                interaction.reply(`you responded too late, your encounter is lost`)
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
                                        else{
                                            interaction.reply(`you responded too late, your encounter is lost`) 
                                            const authorID = interaction.user.id
                                   const data = await profileModel.findOne({userID:authorID},async function(err,foundUser) {
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
                                    else{
                                        interaction.reply(`you responded too late, your encounter is lost`) 
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
                                else{
                                    interaction.reply(`you responded too late, your encounter is lost`)
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
                            else{
                                await interaction.reply(`you have not encountered anything!`)
                                
                                
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
async function monstersDropdown(location:String) {
    const monsters = await getMonsters(location)

    return new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId('select-menu__monsters')
            .setPlaceholder('Select a monster')
            .addOptions(
                monsters.map(m => ({
                    label: m.name,
                    value: m.name,
                }))
            )
    )
}

class PvEDuel extends DuelBuilder {
    player1: Entity
    player2: MonsterEntity
    speed: number
    
    async beforeDuelStart() {
        super.beforeDuelStart()
        if(this.attacker instanceof MonsterEntity){
            await this.replyOrEdit({ content: `starting combat with ${this.player1.name}!` })
        }
        else{
            await this.replyOrEdit({ content: `starting combat with ${this.player2.name}!` })
        }
       
        await sleep(1.2)
        
        
    }
    

    async onSkillSelect(skillName: string) {
        skillName = 'Basic attack'
        const skill = allskills.find(skill => skill.name === skillName)

        this.attacker.useSkill(this.attacker,this.defender,skill)
    }
    
    
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

            this.attacker.useSkill(this.attacker,this.defender)
            await sleep(this.speed)
            
            
        } else {
           console.log(this.speed);
           
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
                for(let j=0;j<skills.length;j++){
                    
                    let val = allskills.find(skill => skill.name === skills[j].name)
                    this.attacker.skills.push(val)
                }
            }
                
            
            
            let strongest = this.attacker.skills[0].damage
            let strongest_type = this.attacker.skills[0].type
            let strongest_name = this.attacker.skills[0].name
            for(let i=0;i<this.attacker.skills.length;i++){
                if(this.attacker.skills[i].type=="physical"){
                    if(strongest_type=="physical"){
                        if(this.attacker.skills[i].damage+this.attacker.attackDamage>strongest+this.attacker.attackDamage
                            ){
                            strongest = this.attacker.skills[i].damage
                            strongest_name = this.attacker.skills[i].name
                            strongest_type = this.attacker.skills[i].type
                        }
                    }
                    if(strongest_type=="magical"){
                        if(this.attacker.skills[i].damage+this.attacker.attackDamage>strongest+this.attacker.magicPower){
                            strongest = this.attacker.skills[i].damage
                            strongest_name = this.attacker.skills[i].name
                            strongest_type = this.attacker.skills[i].type
                        }
                    }
                    
                }
                else if(this.attacker.skills[i].type=="magical"){
                    if(strongest_type=="physical"){
                        if(this.attacker.skills[i].damage+this.attacker.magicPower>strongest+this.attacker.attackDamage){
                            strongest = this.attacker.skills[i].damage
                            strongest_name = this.attacker.skills[i].name
                            strongest_type = this.attacker.skills[i].type
                        }
                    }
                    if(strongest_type=="magical"){
                        if(this.attacker.skills[i].damage+this.attacker.magicPower>strongest+this.attacker.magicPower){
                            strongest = this.attacker.skills[i].damage
                            strongest_name = this.attacker.skills[i].name
                            strongest_type = this.attacker.skills[i].type
                        }
                    }
                    
                }
                
            }
            let skill = allskills.find(skill => skill.name === strongest_name)
            if(this.attacker.mana>=skill.mana_cost){
                if(this.attacker.mana>=2*skill.mana_cost){
                    this.attacker.useSkill(this.attacker,this.defender,skill)
                    await sleep(this.speed)
                }
                else{
                    this.attacker.useSkill(this.attacker,this.defender,skill)
                    await sleep(this.speed)
                    const index = this.attacker.skills.indexOf(skill)
                    this.attacker.skills.splice(index,1)

                }
               
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

        // await this.sendInfoMessage(this.attacker.skills)
        
    }

    async onEnd(winner: Entity, loser: MonsterEntity) {
       const authorID = this.interaction.user.id
        profileModel.findOne({userID:authorID},async function(err,foundUser) {
            
            if(err){
                console.log(err);
                
            }
            else{
                foundUser.encounter = []
                await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter})
                if(winner instanceof Entity){
                    if(foundUser.quest_mob == loser.name && foundUser.quest_quantity>0){
                        foundUser.quest_quantity -=1
                        
                        await profileModel.updateOne({userID:authorID},{quest_quantity:foundUser.quest_quantity})
                    }
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