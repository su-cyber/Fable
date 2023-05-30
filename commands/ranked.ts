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
import { MessageEmbed } from 'discord.js'
import queueModel from '../models/queueSchema'


export default new MyCommandSlashBuilder({ name: 'ranked', description: 'Duel with a player' })
    
    .setDo(async (bot, interaction) => {

        const authorId = interaction.user.id
        let opponentId

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    queueModel.exists({userID:authorId},async function(err,result){

                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            if(result){
                                interaction.reply({content:`You are already in Queue!`,ephemeral:true})
                            }
                            else{
                                let queueEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('RANKED BATTLE')
                                .setDescription(`Looking for a match..`)

                                
                    
                                interaction.reply({embeds:[queueEmbed]})
                                
                                queueModel.findOne({floor:1},async function(err,foundOpponent){
                                    if(foundOpponent){
                                        
                                        opponentId = foundOpponent.userID
                                        await queueModel.deleteOne({userID:opponentId})
                                        const author = await bot.users.fetch(authorId)
                                        const opponent = await bot.users.fetch(opponentId)
                                        let matchEmbed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('RANKED BATTLE')
                                            .setDescription(`Found a match with ${opponent.username}\n\nInitiating Combat...`)

                                            let OppmatchEmbed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('RANKED BATTLE')
                                            .setDescription(`Found a match with ${author.username}\n\nInitiating Combat...`)
                                        await sleep(2)
                                        interaction.editReply({embeds:[matchEmbed]})
                                        opponent.dmChannel.send({embeds:[OppmatchEmbed]})
                                       
              



                                const attacker = await Warrior.create(author)
                                const defender = await Warrior.create(opponent)
                                await sleep(2)
                                profileModel.findOne({userID:interaction.user.id},async function(err,foundUser) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                
                                attacker.health=foundUser.health
                                attacker.mana=foundUser.mana
                                attacker.armor=foundUser.armour
                                attacker.magicPower=foundUser.magicPower
                                attacker.element = foundUser.elements[0].toLowerCase()
                                attacker.attackDamage=foundUser.attackDamage
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
                                
                                
                                    }
                                })
                                profileModel.findOne({userID:opponentId},async function(err,foundUser) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        defender.health=foundUser.health
                                        defender.mana=foundUser.mana
                                        defender.armor=foundUser.armour
                                        defender.magicPower=foundUser.magicPower
                                        defender.element = foundUser.elements[0].toLowerCase()
                                        defender.attackDamage=foundUser.attackDamage
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
                                        
                                    }
                                })
                                
                                
                                if(attacker.speed>= defender.speed){
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
                                    else{
                                        let queue = new queueModel({
                                            userID:authorId,
                                            floor:1
                                        })
                                        queue.save()
                                    }
                                })
                                
                                
                                
                            }
                        }
                    })
                    
                    
                   
                    

                    
                }
                else{
                    interaction.reply({content:"it seems that you are not an awakened yet!",ephemeral:true})
                }
            }

        })
        
        
        
        

        let skills =[]
        class PvPDuel extends DuelBuilder {
            player1: Entity
            player2: Entity
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
                        for(let j=0;j<skills.length;j++){
                            
                            let val = allskills.find(skill => skill.name === skills[j].name)
                            this.attacker.skills.push(val)
                        }
                        if(this.attacker.passive_skills.length !=0){
                            let i
                            for(i=0;i<this.attacker.passive_skills.length;i++){
                                const passive_skill = passive_skills.find(skill => skill.name === this.attacker.passive_skills[i].name)
                                this.attacker.useSkill(this.attacker,this.defender,passive_skill)
                                
                                
                            } 
                        }
                    }
                    if(turn == 0 || turn==1){
                        let skill = this.attacker.skills.find(skill => skill.type === "buff")
                        if(skill){
                            this.attacker.useSkill(this.attacker,this.defender,skill)
                            await sleep(this.speed)
                        }
                        else{
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
                    }
                    else if(this.attacker.health <= 0.5*this.attacker.maxHealth){
                        let skill = this.attacker.skills.find(skill => skill.type === "heal")
                        if(skill){
                            if(skill.mana_cost<=this.attacker.mana){
                                this.attacker.useSkill(this.attacker,this.defender,skill)
                                await sleep(this.speed)
                            }
                           
                        }
                        else{
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
                    }
                    else{
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
                        
                    
                    
                    
        
                    
                    
                }
        
                await this.sendInfoMessage(this.attacker.skills,true)
                
            }
        
            async beforeDuelStart() {
                super.beforeDuelStart()
        
                
                
                
            }
            async onSkillSelect(skillName: string) {
                const skill = allskills.find(skill => skill.name === skillName)
        
                this.attacker.useSkill(this.attacker,this.defender,skill)
            }
        
            async onEnd(winner: Entity, loser: Entity) {
                (await bot.users.fetch(opponentId)).dmChannel.send({embeds:this.duelMessageEmbeds()})
                if(winner.id == opponentId){
                    (await bot.users.fetch(opponentId)).dmChannel.send(`You won the battle against ${loser.name}!`);
                    (await bot.users.fetch(authorId)).dmChannel.send(`You lost the battle against ${winner.name}!`)
                    
                    
                }
                else{
                    (await bot.users.fetch(authorId)).dmChannel.send(`You won the battle against ${loser.name}!`);
                    (await bot.users.fetch(opponentId)).dmChannel.send(`You lost the battle against ${winner.name}!`)
                }
                
            }
        }
    })
    


