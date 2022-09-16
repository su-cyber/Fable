import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { MessageEmbed } from 'discord.js'

export default new MyCommandSlashBuilder({ name: 'stats', description: 'Know your Stats' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        profileModel.exists({userID:authorId},async function(err,res){
            if(res){
                profileModel.findOne({userID:authorId},async function(err,foundUser) {
                    let statEmbed
                    if(foundUser.weapon.length === 0){
                        statEmbed= new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('STATUS WINDOW')
                        .setDescription(`
                        Level: ${foundUser.level}
                        XP: ${foundUser.xp}
                        Coins: ${foundUser.coins}
                        Health: ${foundUser.health}
                        Magic Power: ${foundUser.magicPower}
                        Attack Power: ${foundUser.attackDamage}
                        Mana: ${foundUser.mana}
                        Weapon: None
                        `)
                    }
                    else{
                        statEmbed= new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('STATUS WINDOW')
                        .setDescription(`
                        Level: ${foundUser.level}
                        XP: ${foundUser.xp}
                        Coins: ${foundUser.coins}
                        Health: ${foundUser.health}
                        Magic Power: ${foundUser.magicPower}
                        Attack Power: ${foundUser.attackDamage}
                        Mana: ${foundUser.mana}
                        Weapon: ${foundUser.weapon[0].name}
                        `)
                    }
                    
                    await interaction.reply({embeds:[statEmbed]})
                })
            }
            else{
                await interaction.reply("it seems you are not an awakened yet!")
            }
        })



    })