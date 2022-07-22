const { SlashCommandBuilder } = require("discord.js")

/**
* @file Slash interaction: removeglobal
* @author Felix
* @since 1.0.0
*/
module.exports = {
  data: new SlashCommandBuilder()
    .setName('removeglobal')
    .setDescription('Remove global command')
    .addStringOption((option) => option.setName('id').setDescription('Command ID').setRequired(false)),

  /**
* @description Executes when the slash command with ID removeglobal is called.
* @author Felix
* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const client = interaction.client.application
    if(!interaction.options.getString('ID')) {
      client.commands.set([])
    } else {
      const command = client.commands.get(interaction.options.getString('ID'))
      if(!command) {
        interaction.reply({ content: 'Command not found.' })
        return
      }
      await command.delete()
      interaction.reply({ content: 'Command removed.' })
    }
  }
}
