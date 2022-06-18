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
    const target = imp.prev.targetMember;
    const prev = imp.prev;
    const devtools_row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('devtools_select')
        .setPlaceholder('Nothing selected')
        .addOptions([
          {
            label: 'Change roles',
            description: 'Dev Tools',
            value: 'devtools_changeroles',
          },
        ]),
    );
    // Add the row to the message
    interaction.reply({
      content: 'Select option',
      components: [devtools_row],
      ephemeral: None,
      attachments: [],
    });
  },
};
