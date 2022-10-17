import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'
import { getRandomMonster } from '../src/age/monsters'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/heroes/skills'
import passive_skills from '../src/age/heroes/passive_skills'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'


export default new MyCommandSlashBuilder({ name: 'explore', description: 'Explore the world' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('location').setDescription('location to explore').setRequired(true)
    )
.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const location = interaction.options.getString('location').toLowerCase()
        const author = interaction.guild.members.cache.get(authorId)
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    const attacker = Warrior.create(author)
        profileModel.findOne({userID:authorId},async function(err,foundUser) {
            var userQuestLocation = foundUser.quest_location.toLowerCase()
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

                if(foundUser.weapon.length === 0){
                    attacker.skills=foundUser.magicskills
                }
                else{
                    
                    attacker.skills=foundUser.weaponskills.concat(foundUser.magicskills,foundUser.weapon[0].skills)
                }

                
                
                
            }

            if(location === "ellior"){
                await interaction.deferReply()
                await interaction.editReply({ content: `searching ${location}...`})
                await interaction.editReply({ components: [await monstersDropdown()] })
        
                bot.onComponent('select-menu__monsters', async componentInteraction => {
                    componentInteraction.deferUpdate()
                    await interaction.editReply({ content: '\u200b', components: [] })
                    const monster = (await getMonsters())
                        .find(m => m.name === componentInteraction.values[0])
                        .create()
        
                    await new PvEDuel({
                        interaction,
                        player1: attacker,
                        player2: monster,
                    }).start()
                })
            }
    
            else if(location === userQuestLocation){
                profileModel.findOne({userID:authorId},async function (err,foundUser){
                    if(foundUser.quest_quantity !=0){
                        const monster = (await getMonsters())
                        .find(m => m.name === foundUser.quest_mob)
                        .create()
        
                
                    await new PvEDuel_Quest({
                        interaction,
                        player1: attacker,
                        player2: monster,
                    }).start()
                }
                else{
                    await interaction.deferReply()
                    await interaction.editReply(`You have no active quest!`)
                }
                })
                
    
            }
            else{
                await interaction.deferReply()
                await interaction.editReply(`cannot access ${location}`)
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

async function monstersDropdown() {
    const monsters = await getMonsters()

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

    async beforeDuelStart() {
        super.beforeDuelStart()

        await this.replyOrEdit({ content: `🔎 Found a ${this.player2.name}!` })
        await sleep(1.2)
        
        
    }

    async onSkillSelect(skillName: string) {
        const skill = allskills.find(skill => skill.name === skillName)

        this.attacker.useSkill(this.attacker,this.defender,skill)
    }

    
    

    async onTurn(skipTurn: boolean) {
        const isMonsterTurn = this.attacker instanceof MonsterEntity

        if (skipTurn) {
            if (isMonsterTurn) {
                await sleep(1.5)
                this.deleteInfoMessages()
            }

            return
        }

        if (this.attacker instanceof MonsterEntity) {
            
           
            await this.sendInfoMessage(this.attacker.skills, true)

            this.attacker.useSkill(this.attacker,this.defender)
            
            
        } else {
            
            await this.sendInfoMessage(this.attacker.skills)
            await sleep(1.5)
            this.deleteInfoMessages()
            await this.locker.wait()
            this.locker.lock()
        }

        await this.sendInfoMessage(this.attacker.skills)
        
    }

    async onEnd(winner: Entity, loser: MonsterEntity) {
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
                foundUser.quest_quantity = finalValue
                await profileModel.findOneAndUpdate({userID:authorId},foundUser)
                if(finalValue === 0){
                    foundUser.quest = false
                    await profileModel.findOneAndUpdate({userID:authorId},foundUser)
                }

           
            
        }
    })
        await loser.onDeath(this.interaction, winner)
        
    }

}