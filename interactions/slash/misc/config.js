/**
* @file Slash interaction: config
* @author Felix
* @since 1.0.0
*/
const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Alle Einstellungen.'),
  /**
 * @description Executes when the slash command with ID config is called.
 * @author Felix
 * @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const configRow = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('config')
          .setPlaceholder('Nothing selected')
          .addOptions([
            {
              label: 'Einwohnermeldeamt',
              description: 'Einwohnermeldeamt Einstellungen',
              value: 'einwohnermeldeamt'
            },
            {
              label: 'Beichten',
              description: 'Beichten Einstellungen',
              value: 'beichten'
            }
          ])
      )
    // Add the row to the message
    interaction.reply({
      content: 'Select an option',
      components: [configRow],
      ephemeral: [],
      attachments: []
    });
  }
}
