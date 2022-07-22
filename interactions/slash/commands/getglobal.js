/**
* @file Slash interaction: getglobal
* @author Felix * @since 1.0.0
*/
const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('getglobal')
    .setDescription('Get global command'),

  /**
* @description Executes when the slash command with ID label is called.
* @author Felix
* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    await interaction.deferReply()
    const client = interaction.client.application
    console.log(client)
    const commands = await client.commands.fetch()
    const commandList = []
    for (const command of commands.values()) {
      console.log(command.id)
      commandList.push(`${command.id} - ${command.name}`)
    }

    try {
      await interaction.editReply({ content: commandList.join('\n') })
    } catch (error) {
      interaction.editReply({ content: 'No commands found.' })
    }
  }
}
