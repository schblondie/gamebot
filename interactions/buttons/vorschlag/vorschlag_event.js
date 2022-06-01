/**
 * @file Event button interaction
 * @author Felix
 * @since 1.0.0
 */
 const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js')
 module.exports = {
  id: 'vorschlag_event',

  /**
   * @description Executes when the button with ID "vorschlag_event" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute(interaction, client) {
    const modal = new Modal().setCustomId('vorschlag_anonym').setTitle('Anonymer Vorschlag')
    // Add components to modal
    // Create the text input components
    const titel = new TextInputComponent()
      .setCustomId('titel')
      // The label is the prompt the user sees for this input
      .setLabel('Titel deines Vorschlags')
      // Short means only a single line of text
      .setStyle('SHORT')
    const beschreibung = new TextInputComponent()
      .setCustomId('beschreibung')
      .setLabel('Beschreibung deines Vorschlags')
      // Paragraph means multiple lines of text.
      .setStyle('PARAGRAPH')
    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new MessageActionRow().addComponents(titel)
    const secondActionRow = new MessageActionRow().addComponents(beschreibung)
    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow)
    // Show the modal to the user
    await interaction.showModal(modal)
  },
}
