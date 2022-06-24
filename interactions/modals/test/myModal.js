/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Interaction,
} = require('discord.js')
module.exports = {
    id: 'myModal',

    /**
     * @description Executes when the button with ID "vorschlag" is clicked.
     * @author Felix
     * @param {Object} interaction The Interaction Object of the command.
     */

    async execute(interaction, client) {
        const favoriteColor =
            interaction.fields.getTextInputValue('favoriteColorInput')
        const hobbies = interaction.fields.getTextInputValue('hobbiesInput')
        interaction.reply({ content: favoriteColor, hobbies })
    },
}
