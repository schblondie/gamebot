/**
 * @file Default Error Message On Error Button Interaction
 * @author Felix
 * @since 1.0.0
 */

module.exports = {
  /**
   * @description Executes when the button interaction could not be fetched.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {

    await interaction.reply({
      content: 'There was an issue while fetching this button!',
      ephemeral: true
    })

}
}
