/* eslint-disable brace-style */
module.exports = {
  name: 'interactionCreate',

  /**
   * @description Executes when an interaction is created and handle it.

   * @param {Object} interaction The interaction which was created
   */

  execute: async (interaction) => {
    // Deconstructed client from interaction object.
    const { client } = interaction

    // Checks if the interaction is a button interaction (to prevent weird bugs)

    if (!interaction.isContextMenuCommand()) return

    /**********************************************************************/

    // Checks if the interaction target was a user
    if (interaction.type === 2) {
      /**
       * @description The Interaction command object
       * @type {Object}
       */

      const command = client.contextCommands.get(
        'USER ' + interaction.commandName
      )

      // A try to execute the interaction.

      try {
        await command.execute(interaction)
        return
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        await interaction.reply({
          content: 'There was an issue while executing that context command!',
          ephemeral: true
        })
      }
    }
    // Checks if the interaction target was a user
    else if (interaction.type === 3) {
      /**
       * @description The Interaction command object
       * @type {Object}
       */

      const command = client.contextCommands.get(
        'MESSAGE ' + interaction.commandName
      )

      // A try to execute the interaction.

      try {
        await command.execute(interaction)
        return
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        await interaction.reply({
          content: 'There was an issue while executing that context command!',
          ephemeral: true
        })
      }
    }

    // Practically not possible, but we are still caching the bug.
    // Possible Fix is a restart!
    else {
      // eslint-disable-next-line no-console
      return console.log(
        'Something weird happening in context menu. Received a context menu of unknown type.'
      )
    }
  }
}
