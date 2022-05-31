/**
 * @file Sample help command with slash command.
 * @author Felix
 * @since 1.0.0
 */

// https://gist.github.com/GeneralSadaf/42d91a2b6a93a7db7a39208f2d8b53ad
const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions, MessageEmbed, Modal, TextInputComponent, MessageActionRow } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Modal test'),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    const modal = new Modal()
			.setCustomId('myModal')
			.setTitle('My Modal');
		// Add components to modal
		// Create the text input components
		const favoriteColorInput = new TextInputComponent()
			.setCustomId('favoriteColorInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
		    // Short means only a single line of text
			.setStyle('SHORT');
		const hobbiesInput = new TextInputComponent()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
		    // Paragraph means multiple lines of text.
			.setStyle('PARAGRAPH');
		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);
		const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);
		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);
		// Show the modal to the user
		await interaction.showModal(modal);
  },
}
