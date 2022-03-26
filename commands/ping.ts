import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'

export default new MyCommandSlashBuilder({ name: 'ping', description: 'Pong!' }).setDo(async interaction => {
    await interaction.reply({
        content: 'Pong!',
    })
})
