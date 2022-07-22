/**
 * @file Default Error Message On Error Modal Interaction

 * @since 1.0.0
 */

module.exports = {
  /**
   * @description Executes when the modal interaction could not be fetched.

   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    await interaction.reply({
      content: 'There was an issue while fetching this modal!',
      ephemeral: true
    })
  }
}
