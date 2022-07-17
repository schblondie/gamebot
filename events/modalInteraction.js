module.exports = {
  name: 'interactionCreate',

  /**
   * @description Executes when an interaction is created and handle it.
   * @author Felix
   * @param {Object} interaction The interaction which was created
   */

  async execute (interaction) {
    // Deconstructed client from interaction object.
    const { client } = interaction

    // Checks if the interaction is a button interaction (to prevent weird bugs)

    if (!interaction.isModalSubmit()) return
    /**
     * @description The Interaction command object
     * @type {Object}
     */

    const command = client.modalCommands.get(interaction.customId)

    // If the interaction is not a command in cache, return error message.
    // You can modify the error message at ./messages/defaultButtonError.js file!

    if (!command) {
      await require('../messages/defaultModalError').execute(interaction)
      return
    }

    // A try to execute the interaction.

    try {
      await command.execute(interaction)
      return
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      await interaction.reply({
        content: 'There was an issue while executing that modal!',
        ephemeral: true
      })
    }
  }
}
