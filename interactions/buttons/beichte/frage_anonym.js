/**
 * @file Sample button interaction
 * @author Felix, Mezo
 * @since 1.0.0
 */
const {
  ActionRowBuilder,
  Modal,
  TextInputBuilder
} = require('discord.js')
module.exports = {
  id: 'anonyme_frage',

  /**
   * @description Executes when the button with ID "anonym" is clicked.
   * @author Felix, Mezo
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const modal = new Modal()
      .setCustomId('anonyme_frage')
      .setTitle('Anonyme Frage')
    // Add components to modal
    // Create the text input components
    const titel = new TextInputBuilder()
      .setCustomId('titel')
    // The label is the prompt the user sees for this input
      .setLabel('Titel deiner Frage')
    // Short means only a single line of text
      .setStyle('SHORT')
    const beschreibung = new TextInputBuilder()
      .setCustomId('beschreibung')
      .setLabel('Beschreibung deiner Frage')
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
