/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */

module.exports = {
  id: 'devtools',

  /**
   * @description Executes when the button with ID "devtools" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute(interaction) {
    await interaction.reply({
      content: 'This was a reply from button handler!',
    });
    return;
  },
};
