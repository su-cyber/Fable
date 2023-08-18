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
import { PvEDuel } from './fight'
import { BeerBuccaneer2 } from '../src/age/monsters/Sunshade Forest/BeerBuccaneer2'

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
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})

                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            
                                const attacker = await Warrior.create(author)
                                const monster = await BeerBuccaneer2.create()
                                 profileModel.findOne({userID:authorId},async function(err,foundUser) {
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
                                    attacker.element = attacker.element.toLowerCase()
                                
                                    }
                                })
                                profileModel.findOne({userID:opponentId},async function(err,foundOpponent) {
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        monster.name = opponent.username
                                        monster.health=getHealth(foundOpponent.level,foundOpponent.vitality)
                                        monster.maxHealth=getHealth(foundOpponent.level,foundOpponent.vitality)
                                        monster.mana=foundOpponent.mana
                                        monster.maxMana = foundOpponent.mana
                                        monster.armor=foundOpponent.armour
                                        monster.magicPower=foundOpponent.magicPower
                                        monster.element = foundOpponent.elements[0].toLowerCase()
                                        monster.attackDamage=foundOpponent.attackDamage
                                        monster.evasion=foundOpponent.evasion
                                        monster.passive_skills = foundOpponent.passiveskills
                                        monster.speed = foundOpponent.speed
                                        
                                        
                                        const opponentskills = []
                                       for(let i=0;i<foundOpponent.currentskills.length;i++){
                                        const findskill = allskills.find(skill => skill.name == foundOpponent.currentskills[0].name)
                                        opponentskills.push(findskill)
                                       }
                                        monster.skills=opponentskills
                                        monster.element = monster.element.toLowerCase()
                                        
                                    }
                                })
                                
                                
                                
                                if(attacker.speed>= monster.speed){
                                    await new PvPDuel({
                                        interaction,
                                        player1: attacker,
                                        player2: monster,
                                        speed:2.5
                                    }).start()
                                }
                                else{
                                    await new PvPDuel({
                                        interaction,
                                        player1: monster,
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
                            
                            collector.on('end', () => {
                            interaction.deleteReply()
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

class PvPDuel extends PvEDuel {
    player1: Entity
    player2: Entity
    speed:number

    

    async beforeDuelStart() {
        super.beforeDuelStart()

        await this.replyOrEdit({ content: `initiating duel with ${this.player2.name}!`,embeds:[],components:[]})
        await sleep(1.2)
        
        
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