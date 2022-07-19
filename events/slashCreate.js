module.exports = {
  name: 'interactionCreate',

  /**
   * @description Executes when an interaction is created and handle it.
   * @author Felix, Mezo
   * @param {Object} interaction The interaction which was created
   */

  async execute (interaction) {
    // Deconstructed client from interaction object.
    const { client } = interaction

    // Checks if the interaction is a command (to prevent weird bugs)

    if (!interaction.isChatInputCommand()) return
    /**
     * @description The Interaction command object
     * @type {Object}
     */

    const command = client.slashCommands.get(interaction.commandName)

    // If the interaction is not a command in cache.

    if (!command) return

    // A try to executes the interaction.

    try {
      await command.execute(interaction)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      await interaction.reply({
        content: 'There was an issue while executing that command!',
        ephemeral: true
      })
    }
  }
}
