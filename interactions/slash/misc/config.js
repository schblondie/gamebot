/**
* @file Slash interaction: config
* @author Felix, Mezo
* @since 1.0.0
*/
const { ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Alle Einstellungen.'),
  /**
 * @description Executes when the slash command with ID config is called.
 * @author Felix, Mezo
 * @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const configRow = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()
          .setCustomId('config')
          .setPlaceholder('Nothing selected')
          .addOptions([
            {
              label: 'Einwohnermeldeamt',
              description: 'Einwohnermeldeamt Einstellungen',
              value: 'einwohnermeldeamt'
            },
            {
              label: 'Anonymisierung',
              description: 'Anonymisierung Einstellungen',
              value: 'anonym'
            }
          ])
      )
    // Add the row to the message
    interaction.reply({
      content: 'Select an option',
      components: [configRow]
    })
  }
}
