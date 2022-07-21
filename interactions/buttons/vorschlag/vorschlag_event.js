/**
 * @file Event button interaction
 * @author Felix
 * @since 1.0.0
 */
const { ActionRowBuilder, Modal, TextInputBuilder } = require('discord.js')
module.exports = {
  id: 'vorschlag_event',

  /**
   * @description Executes when the button with ID "vorschlag_event" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const modal = new Modal()
      .setCustomId('vorschlag_event')
      .setTitle('Event Vorschlag')
    // Add components to modal
    // Create the text input components
    const titel = new TextInputBuilder()
      .setCustomId('titel')
    // The label is the prompt the user sees for this input
      .setLabel('Titel deines Vorschlags')
    // Short means only a single line of text
      .setStyle('SHORT')
    const beschreibung = new TextInputBuilder()
      .setCustomId('beschreibung')
      .setLabel('Beschreibung deines Vorschlags')
    // Paragraph means multiple lines of text.
      .setStyle('PARAGRAPH')
    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(titel)
    const secondActionRow = new ActionRowBuilder().addComponents(beschreibung)
    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow)
    // Show the modal to the user
    await interaction.showModal(modal)
  }
}
