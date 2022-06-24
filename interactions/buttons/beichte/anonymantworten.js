/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const {
    MessageActionRow,
    Modal,
    TextInputComponent
} = require('discord.js')
module.exports = {
    id: 'anonymantworten',

    /**
   * @description Executes when the button with ID "anonymantworten" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

    async execute (interaction) {

        const modal = new Modal()
            .setCustomId('anonym_antworten')
            .setTitle('Anonym antworten')
        // Add components to modal
        // Create the text input components
        const text = new TextInputComponent()
            .setCustomId('text')
        // The label is the prompt the user sees for this input
            .setLabel('Deine Nachricht')
        // Short means only a single line of text
            .setStyle('PARAGRAPH')
        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new MessageActionRow().addComponents(text)
        // Add inputs to the modal
        modal.addComponents(firstActionRow)
        const prev = interaction
        module.exports.prev = prev
        // Show the modal to the user
        await interaction.showModal(modal)

    }
}
