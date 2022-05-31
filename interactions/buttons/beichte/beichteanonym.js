/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js')
module.exports = {
  id: 'anonyme_beichte',

  /**
   * @description Executes when the button with ID "anonym" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute(interaction, client) {
    async function run() {
      const row1 = new MessageActionRow().addComponents(
        new MessageButton().setLabel('Frage').setCustomId('anonyme_frage').setStyle('PRIMARY'),
        new MessageButton().setLabel('Beichte').setCustomId('anonyme_beichte').setStyle('SECONDARY'),
      )
      const fetch = await interaction.channel.messages.fetch({ limit: 10 })
      var fetchfiltered = fetch.filter(function (list) {
        return list.content == 'Drücke hier um einen Beichte oder Frage einzureichen'
      })
      var id = fetchfiltered.map(function (list) {
        return list.id
      })
      if (id.length != 0) {
        interaction.channel.messages
          .fetch(id.toString())
          .then((message) => {
            message.delete()
          })
          .catch({})
      }
      interaction.channel.send({
        content: 'Drücke hier um einen Beichte oder Frage einzureichen',
        components: [row1],
      })
    }
    const modal = new Modal()
			.setCustomId('anonyme_beichte')
			.setTitle('Anonyme Beichte')
		// Add components to modal
		// Create the text input components
		const titel = new TextInputComponent()
			.setCustomId('titel')
		    // The label is the prompt the user sees for this input
			.setLabel("Titel deiner Beichte")
		    // Short means only a single line of text
			.setStyle('SHORT');
		const beschreibung = new TextInputComponent()
			.setCustomId('beschreibung')
			.setLabel("Beschreibung deiner Beichte")
		    // Paragraph means multiple lines of text.
			.setStyle('PARAGRAPH');
		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new MessageActionRow().addComponents(titel);
		const secondActionRow = new MessageActionRow().addComponents(beschreibung);
		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);
		// Show the modal to the user
		await interaction.showModal(modal);
    
    run().then().catch(console.error)
  },
}
