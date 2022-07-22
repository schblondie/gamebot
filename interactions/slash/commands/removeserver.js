const { SlashCommandBuilder } = require("discord.js")

/**
* @file Slash interaction: removeserver
* @author Felix
* @since 1.0.0
*/
module.exports = {
  data: new SlashCommandBuilder()
    .setName('removeserver')
    .setDescription('Remove global command')
    .addStringOption((option) => option.setName('server').setDescription('Server ID').setRequired(true))
    .addStringOption((option) => option.setName('id').setDescription('Command ID').setRequired(false)),

  /**
* @description Executes when the slash command with ID removeserver is called.
* @author Felix
* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const guild = await interaction.client.guilds.cache.get(interaction.options.getString('server'))
    if(!interaction.options.getString('id')) {
      guild.commands.set([])
      interaction.reply({ content: 'All commands removed' })
    } else {
      const command = guild.commands.get(interaction.options.getString('ID'))
      if(!command) {
        interaction.reply({ content: 'Command not found.' })
        return
      }
      await command.delete()
      interaction.reply({ content: 'Command removed.' })
    }
  }
}
